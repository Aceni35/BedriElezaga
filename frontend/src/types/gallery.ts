export const GALLERY_SECTIONS = ['staff', 'about', 'students', 'home'] as const;
export type GallerySection = (typeof GALLERY_SECTIONS)[number];

export const ABOUT_CATEGORIES = ['history', 'mission'] as const;
export type AboutCategory = (typeof ABOUT_CATEGORIES)[number];

export const STUDENTS_CATEGORIES = ['orari', 'rregullorja'] as const;
export type StudentsCategory = (typeof STUDENTS_CATEGORIES)[number];

export const HOME_CATEGORIES = ['image1', 'image2', 'image3'] as const;
export type HomeCategory = (typeof HOME_CATEGORIES)[number];

export interface GalleryPicture {
  key: string;
  url: string;
}

export interface GalleryItem {
  section: GallerySection;
  category: string;
  picture: GalleryPicture;
  updatedAt: string;
}

export interface GalleryListResponse {
  items: GalleryItem[];
}
