package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// --- USER & AUTH ---
type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Username  string    `gorm:"uniqueIndex;not null" json:"username"`
	Password  string    `gorm:"not null" json:"-"`
	FullName  string    `json:"full_name"`
	CreatedAt time.Time `json:"created_at"`
}

// --- CONFIGURATION & SETTINGS ---
type GlobalSetting struct {
	ID    uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Key   string    `gorm:"uniqueIndex" json:"key"` // "site_logo", "footer_slogan", "contact_address"
	Value string    `gorm:"type:text" json:"value"`
}

type Language struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Code      string    `gorm:"uniqueIndex;not null" json:"code"`
	Name      string    `json:"name"`
	IsDefault bool      `gorm:"default:false" json:"is_default"`
}

// --- DYNAMIC STRUCTURE (MENUS & PAGES) ---
type Menu struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	ParentID     *uuid.UUID `gorm:"type:uuid;index" json:"parent_id,omitempty"`
	Path         string    `json:"path"`
	SortOrder    int       `json:"sort_order"`
	Translations []Translation `gorm:"foreignKey:MenuID" json:"translations,omitempty"`
	Children     []Menu    `gorm:"foreignKey:ParentID" json:"children,omitempty"`
}

type Page struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Slug         string    `gorm:"uniqueIndex" json:"slug"`
	LayoutType   string    `json:"layout_type"`
	Translations []Translation `gorm:"foreignKey:PageID" json:"translations,omitempty"`
}

// --- CONTENT MODULES (THE HEART OF THE CMS) ---

// PageSection: Hero, About, Lifestyle, Agriculture ana bölümleri
type PageSection struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	ModuleKey    string    `gorm:"uniqueIndex" json:"module_key"` // "hero_home", "lifestyle_main", "agriculture_intro"
	ImageURL     string    `json:"image_url"`
	VideoURL     string    `json:"video_url"`
	SortOrder    int       `json:"sort_order"`
	IsActive     bool      `gorm:"default:true" json:"is_active"`
	Translations []Translation `gorm:"foreignKey:SectionID" json:"translations,omitempty"`
	Items        []ModuleItem `gorm:"foreignKey:SectionID" json:"items,omitempty"` // Alt maddeler
}

// ModuleItem: Bölüm içindeki listeler (Neden biz? Başarılar, Hizmet Maddeleri)
type ModuleItem struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	SectionID    uuid.UUID `gorm:"type:uuid;index" json:"section_id"`
	Icon         string    `json:"icon"`
	Value        string    `json:"value"` // Rakamlar için (+300 Mn gibi)
	SortOrder    int       `json:"sort_order"`
	Translations []Translation `gorm:"foreignKey:ItemID" json:"translations,omitempty"`
}

// Reference: Matild Palace gibi projeler ve referanslar
type Reference struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Category     string    `json:"category"` // "hospitality", "industrial", "residential"
	Year         string    `json:"year"`
	Location     string    `json:"location"`
	ImageURL     string    `json:"image_url"`
	SortOrder    int       `json:"sort_order"`
	Translations []Translation `gorm:"foreignKey:ReferenceID" json:"translations,omitempty"`
}

// Content: Generic key-value content for multi-language UI text
type Content struct {
	ID          uuid.UUID     `gorm:"type:uuid;primary_key;" json:"id"`
	Key         string        `gorm:"uniqueIndex;not null" json:"key"`
	Type        string        `json:"type"`     // "string", "html", "array"
	Category    string        `json:"category"` // "hero", "about", "ui"
	Description string        `json:"description"`
	SortOrder   int           `gorm:"default:0" json:"sort_order"`
	IsActive    bool          `gorm:"default:true" json:"is_active"`
	Translations []Translation `gorm:"foreignKey:ContentID" json:"translations,omitempty"`
}

// --- UNIFIED TRANSLATIONS ---
type Translation struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Language    string    `gorm:"not null;index" json:"language"` // "tr", "en", "ar"
	Field       string    `json:"field"` // "title", "subtitle", "description", "label", "meta_title"
	Value       string    `gorm:"type:text" json:"value"`
	
	// Foreign Keys
	ContentID   *uuid.UUID `gorm:"type:uuid;index" json:"content_id,omitempty"`
	MenuID      *uuid.UUID `gorm:"type:uuid;index" json:"menu_id,omitempty"`
	PageID      *uuid.UUID `gorm:"type:uuid;index" json:"page_id,omitempty"`
	SectionID   *uuid.UUID `gorm:"type:uuid;index" json:"section_id,omitempty"`
	ItemID      *uuid.UUID `gorm:"type:uuid;index" json:"item_id,omitempty"`
	ReferenceID *uuid.UUID `gorm:"type:uuid;index" json:"reference_id,omitempty"`
}

// UUID Hooks
func (m *User) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *GlobalSetting) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Language) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Menu) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Page) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *PageSection) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *ModuleItem) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Reference) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Content) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
func (m *Translation) BeforeCreate(tx *gorm.DB) error { m.ID = uuid.New(); return nil }
