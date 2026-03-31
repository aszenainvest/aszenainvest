package handlers

import (
	"net/http"
	"aszena-invest-backend/internal/db"
	"aszena-invest-backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// --- GLOBAL SETTINGS CRUD ---
func GetAllSettings(c *gin.Context) {
	var settings []models.GlobalSetting
	db.DB.Find(&settings)
	c.JSON(http.StatusOK, settings)
}

func UpsertSetting(c *gin.Context) {
	var s models.GlobalSetting
	c.ShouldBindJSON(&s)
	if s.ID == uuid.Nil { s.ID = uuid.New(); db.DB.Create(&s) } else { db.DB.Save(&s) }
	c.JSON(200, s)
}

// --- MODULAR SECTION HANDLERS (CMS ENGINE) ---
func GetPageSections(c *gin.Context) {
	var sections []models.PageSection
	// Preload everything to return fully structured data
	db.DB.Preload("Translations").Preload("Items.Translations").
		Order("sort_order asc").Find(&sections)
	c.JSON(http.StatusOK, sections)
}

func GetSectionByKey(c *gin.Context) {
	key := c.Param("key")
	var section models.PageSection
	if err := db.DB.Preload("Translations").Preload("Items.Translations").
		Where("module_key = ?", key).First(&section).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Section not found"})
		return
	}
	c.JSON(http.StatusOK, section)
}

func UpsertPageSection(c *gin.Context) {
	var section models.PageSection
	c.ShouldBindJSON(&section)
	db.DB.Transaction(func(tx *gorm.DB) error {
		if section.ID == uuid.Nil { section.ID = uuid.New(); tx.Create(&section) } else { tx.Save(&section) }
		for _, t := range section.Translations {
			t.SectionID = &section.ID
			if t.ID == uuid.Nil { t.ID = uuid.New(); tx.Create(&t) } else { tx.Save(&t) }
		}
		return nil
	})
	c.JSON(200, section)
}

func UpsertModuleItem(c *gin.Context) {
	var item models.ModuleItem
	c.ShouldBindJSON(&item)
	db.DB.Transaction(func(tx *gorm.DB) error {
		if item.ID == uuid.Nil { item.ID = uuid.New(); tx.Create(&item) } else { tx.Save(&item) }
		for _, t := range item.Translations {
			t.ItemID = &item.ID
			if t.ID == uuid.Nil { t.ID = uuid.New(); tx.Create(&t) } else { tx.Save(&t) }
		}
		return nil
	})
	c.JSON(200, item)
}

// --- REFERENCE / PROJECT HANDLERS ---
func GetAllReferences(c *gin.Context) {
	var refs []models.Reference
	db.DB.Preload("Translations").Order("sort_order asc").Find(&refs)
	c.JSON(http.StatusOK, refs)
}

func UpsertReference(c *gin.Context) {
	var ref models.Reference
	c.ShouldBindJSON(&ref)
	db.DB.Transaction(func(tx *gorm.DB) error {
		if ref.ID == uuid.Nil { ref.ID = uuid.New(); tx.Create(&ref) } else { tx.Save(&ref) }
		for _, t := range ref.Translations {
			t.ReferenceID = &ref.ID
			if t.ID == uuid.Nil { t.ID = uuid.New(); tx.Create(&t) } else { tx.Save(&t) }
		}
		return nil
	})
	c.JSON(200, ref)
}

// --- LANGUAGE, MENU & PAGE HANDLERS (As created previously) ---
func GetAllLanguages(c *gin.Context) { var langs []models.Language; db.DB.Find(&langs); c.JSON(200, langs) }
func UpsertLanguage(c *gin.Context) { var l models.Language; c.ShouldBindJSON(&l); if l.ID == uuid.Nil { l.ID = uuid.New(); db.DB.Create(&l) } else { db.DB.Save(&l) }; c.JSON(200, l) }
func GetNavigation(c *gin.Context) { var menus []models.Menu; db.DB.Preload("Translations").Preload("Children.Translations").Where("parent_id IS NULL").Order("sort_order asc").Find(&menus); c.JSON(200, menus) }
func UpsertMenu(c *gin.Context) { var m models.Menu; c.ShouldBindJSON(&m); db.DB.Transaction(func(tx *gorm.DB) error { if m.ID == uuid.Nil { m.ID = uuid.New(); tx.Create(&m) } else { tx.Save(&m) }; for _, t := range m.Translations { t.MenuID = &m.ID; if t.ID == uuid.Nil { t.ID = uuid.New(); tx.Create(&t) } else { tx.Save(&t) } }; return nil }); c.JSON(200, m) }
func GetAllPages(c *gin.Context) { var p []models.Page; db.DB.Preload("Translations").Find(&p); c.JSON(200, p) }
func UpsertPage(c *gin.Context) { var p models.Page; c.ShouldBindJSON(&p); db.DB.Transaction(func(tx *gorm.DB) error { if p.ID == uuid.Nil { p.ID = uuid.New(); tx.Create(&p) } else { tx.Save(&p) }; for _, t := range p.Translations { t.PageID = &p.ID; if t.ID == uuid.Nil { t.ID = uuid.New(); tx.Create(&t) } else { tx.Save(&t) } }; return nil }); c.JSON(200, p) }
