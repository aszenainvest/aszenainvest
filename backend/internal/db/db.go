package db

import (
	"fmt"
	"log"
	"os"

	"aszena-invest-backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=aszena port=5432 sslmode=disable"
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	fmt.Println("Database connection established!")

	// --- FULL SYSTEM MIGRATION ---
	err = DB.AutoMigrate(
		&models.User{},
		&models.Language{},
		&models.GlobalSetting{},
		&models.Menu{},
		&models.Page{},
		&models.PageSection{},
		&models.ModuleItem{},
		&models.Reference{},
		&models.Translation{},
	)

	if err != nil {
		log.Fatal("Failed to auto-migrate tables:", err)
	}

	fmt.Println("Full Dynamic CMS Migration completed!")
}
