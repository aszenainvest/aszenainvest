package handlers

import (
	"net/http"

	"aszena-invest-backend/internal/db"
	"aszena-invest-backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// GetContentByLang retrieves all translations for a specific language in a flat JSON format
func GetContentByLang(c *gin.Context) {
	lang := c.Param("lang")
	var translations []struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	}

	result := db.DB.Table("translations").
		Select("contents.key, translations.value").
		Joins("join contents on contents.id = translations.content_id").
		Where("translations.language = ? AND contents.is_active = ?", lang, true).
		Scan(&translations)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch translations"})
		return
	}

	// Transform to a key-value map for frontend
	response := make(map[string]string)
	for _, t := range translations {
		response[t.Key] = t.Value
	}

	c.JSON(http.StatusOK, response)
}

// GetAllAdminContent lists all content blocks with their translations for the admin panel
func GetAllAdminContent(c *gin.Context) {
	var contents []models.Content

	result := db.DB.Preload("Translations").Order("key asc").Find(&contents)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch content"})
		return
	}

	c.JSON(http.StatusOK, contents)
}

// UpsertContent updates or inserts a content key and its translations
func UpsertContent(c *gin.Context) {
	var req struct {
		Key          string `json:"key" binding:"required"`
		Type         string `json:"type"`
		Category     string `json:"category"`
		Description  string `json:"description"`
		SortOrder    int    `json:"sort_order"`
		IsActive     bool   `json:"is_active"`
		Translations []struct {
			Language string `json:"language" binding:"required"`
			Value    string `json:"value"`
		} `json:"translations"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := db.DB.Transaction(func(tx *gorm.DB) error {
		var content models.Content
		
		// Find or create Content
		if err := tx.Where("key = ?", req.Key).First(&content).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				content = models.Content{
					ID:          uuid.New(),
					Key:         req.Key,
					Type:        req.Type,
					Category:    req.Category,
					Description: req.Description,
					SortOrder:   req.SortOrder,
					IsActive:    req.IsActive,
				}
				if err := tx.Create(&content).Error; err != nil {
					return err
				}
			} else {
				return err
			}
		} else {
			// Update existing content metadata
			content.Type = req.Type
			content.Category = req.Category
			content.Description = req.Description
			content.SortOrder = req.SortOrder
			content.IsActive = req.IsActive
			content.Key = req.Key // Key change support
			if err := tx.Save(&content).Error; err != nil {
				return err
			}
		}

		// Update or Insert Translations
		for _, t := range req.Translations {
			var trans models.Translation
			if err := tx.Where("content_id = ? AND language = ?", content.ID, t.Language).First(&trans).Error; err != nil {
				if err == gorm.ErrRecordNotFound {
					trans = models.Translation{
						ID:        uuid.New(),
						ContentID: &content.ID,
						Language:  t.Language,
						Value:     t.Value,
					}
					if err := tx.Create(&trans).Error; err != nil {
						return err
					}
				} else {
					return err
				}
			} else {
				trans.Value = t.Value
				if err := tx.Save(&trans).Error; err != nil {
					return err
				}
			}
		}
		return nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update content"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content updated successfully"})
}

// DeleteContent removes a content block and its translations
func DeleteContent(c *gin.Context) {
	id := c.Param("id")
	
	err := db.DB.Transaction(func(tx *gorm.DB) error {
		// Delete translations first due to foreign key
		if err := tx.Where("content_id = ?", id).Delete(&models.Translation{}).Error; err != nil {
			return err
		}
		// Delete the content block
		if err := tx.Where("id = ?", id).Delete(&models.Content{}).Error; err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete content"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content deleted successfully"})
}
