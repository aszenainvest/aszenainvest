package main

import (
	"log"
	"os"

	"aszena-invest-backend/internal/auth"
	"aszena-invest-backend/internal/db"
	"aszena-invest-backend/internal/handlers"
	"aszena-invest-backend/internal/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, assuming environment variables are set")
	}
	db.InitDB()
	SeedInitialAdmin()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// --- PUBLIC API ---
	api := r.Group("/api")
	{
		api.GET("/sections", handlers.GetPageSections)
		api.GET("/sections/:key", handlers.GetSectionByKey)
		api.GET("/projects", handlers.GetAllReferences)
		api.GET("/metadata/:lang", handlers.GetContentByLang)
		api.GET("/settings", handlers.GetAllSettings)
		api.GET("/languages", handlers.GetAllLanguages)
		api.GET("/navigation", handlers.GetNavigation)
		api.GET("/pages", handlers.GetAllPages)
		api.POST("/auth/login", handlers.Login)
	}

	// --- ADMIN API ---
	admin := r.Group("/api/admin")
	admin.Use(AuthMiddleware())
	{
		// Modular Sections
		admin.GET("/sections", handlers.GetPageSections)
		admin.GET("/sections/:key", handlers.GetSectionByKey)
		admin.POST("/sections", handlers.UpsertPageSection)
		admin.POST("/items", handlers.UpsertModuleItem)
		
		// References / Projects
		admin.GET("/projects", handlers.GetAllReferences)
		admin.POST("/projects", handlers.UpsertReference)

		// Generic Content (i18n keys)
		admin.GET("/content", handlers.GetAllAdminContent)
		admin.POST("/content", handlers.UpsertContent)
		admin.DELETE("/content/:id", handlers.DeleteContent)

		// Settings, Languages, Navigation, Pages
		admin.GET("/settings", handlers.GetAllSettings)
		admin.POST("/settings", handlers.UpsertSetting)

		admin.GET("/languages", handlers.GetAllLanguages)
		admin.POST("/languages", handlers.UpsertLanguage)

		admin.GET("/navigation", handlers.GetNavigation)
		admin.POST("/navigation", handlers.UpsertMenu)

		admin.GET("/pages", handlers.GetAllPages)
		admin.POST("/pages", handlers.UpsertPage)
	}

	port := os.Getenv("PORT")
	if port == "" { port = "8081" }
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(401, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}
		claims, err := auth.ValidateToken(tokenString)
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}
		c.Set("user_id", claims.UserID)
		c.Set("username", claims.Username)
		c.Next()
	}
}

func SeedInitialAdmin() {
	var count int64
	db.DB.Model(&models.User{}).Count(&count)
	if count == 0 {
		hashedPassword, _ := auth.HashPassword("admin123")
		admin := models.User{
			ID:       uuid.New(),
			Username: "admin",
			Password: hashedPassword,
			FullName: "Admin User",
		}
		db.DB.Create(&admin)
		log.Println("Default admin user created: admin / admin123")
	}
}
