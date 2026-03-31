package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"aszena-invest-backend/internal/db"
	"aszena-invest-backend/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func main() {
	db.InitDB()

	// Import EN and TR
	languages := []string{"en", "tr"}
	for _, lang := range languages {
		filePath := fmt.Sprintf("../src/i18n/%s.json", lang)
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			log.Printf("File %s not found, skipping...", filePath)
			continue
		}

		data, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Fatalf("Failed to read %s: %v", filePath, err)
		}

		var m map[string]interface{}
		if err := json.Unmarshal(data, &m); err != nil {
			log.Fatalf("Failed to unmarshal %s: %v", filePath, err)
		}

		flat := make(map[string]string)
		flatten(m, "", flat)

		log.Printf("Importing %d keys for language: %s", len(flat), lang)

		for key, val := range flat {
			saveContent(key, lang, val)
		}
	}
	fmt.Println("Import completed successfully!")
}

func flatten(m map[string]interface{}, prefix string, flat map[string]string) {
	for k, v := range m {
		newKey := k
		if prefix != "" {
			newKey = prefix + "." + k
		}

		switch child := v.(type) {
		case string:
			flat[newKey] = child
		case map[string]interface{}:
			flatten(child, newKey, flat)
		case []interface{}:
			// Handle arrays by joining or indexing
			var items []string
			for _, item := range child {
				if s, ok := item.(string); ok {
					items = append(items, s)
				}
			}
			flat[newKey] = strings.Join(items, " | ")
		}
	}
}

func saveContent(key, lang, value string) {
	var content models.Content
	err := db.DB.Where("key = ?", key).First(&content).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			content = models.Content{
				ID:   uuid.New(),
				Key:  key,
				Type: "string",
			}
			db.DB.Create(&content)
		} else {
			log.Printf("Error searching content %s: %v", key, err)
			return
		}
	}

	var trans models.Translation
	err = db.DB.Where("content_id = ? AND language = ?", content.ID, lang).First(&trans).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			trans = models.Translation{
				ID:        uuid.New(),
				ContentID: &content.ID,
				Language:  lang,
				Value:     value,
			}
			db.DB.Create(&trans)
		}
	} else {
		trans.Value = value
		db.DB.Save(&trans)
	}
}
