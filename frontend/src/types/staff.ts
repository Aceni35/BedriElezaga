export const STAFF_CATEGORIES = [
  'school_bodies',
  'directorate',
  'administration',
  'professional_associates',
  'teachers',
  'assistants',
  'maintenance',
] as const;

export type StaffCategory = (typeof STAFF_CATEGORIES)[number];

export const STAFF_CATEGORY_LABELS: Record<StaffCategory, string> = {
  school_bodies: 'Organet e shkollës',
  directorate: 'Drejtoria',
  administration: 'Administrata',
  professional_associates: 'Bashkëpunëtorët profesionalë',
  teachers: 'Mësuesit',
  assistants: 'Asistentët',
  maintenance: 'Mirëmbajtja',
};

export interface StaffPicture {
  key: string;
  url: string;
}

export interface Staff {
  id: string;
  fullName: string;
  category: StaffCategory;
  position: string;
  description: string | null;
  memberSince: number;
  email: string | null;
  phone: string | null;
  picture: StaffPicture;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffInput {
  fullName: string;
  category: StaffCategory;
  position: string;
  description?: string;
  memberSince: number;
  email?: string;
  phone?: string;
  pictureKey: string;
}

export type UpdateStaffInput = Partial<CreateStaffInput>;

export interface ListStaffParams {
  page?: number;
  limit?: number;
  category?: StaffCategory;
  search?: string;
  sort?: string;
}

export interface PaginatedStaff {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  items: Staff[];
}
