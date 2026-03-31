package handlers

import (
	"net/http"

	"aszena-invest-backend/internal/auth"
	"aszena-invest-backend/internal/db"
	"aszena-invest-backend/internal/models"
	"github.com/gin-gonic/gin"
)

// Login handles admin login
func Login(c *gin.Context) {
	var credentials struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login credentials"})
		return
	}

	var user models.User
	if err := db.DB.Where("username = ?", credentials.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	if !auth.CheckPassword(credentials.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	token, err := auth.GenerateToken(user.ID, user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":        user.ID,
			"username":  user.Username,
			"full_name": user.FullName,
		},
	})
}
