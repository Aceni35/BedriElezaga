export const DOCUMENT_CATEGORIES = [
  'calendar',
  'form',
  'regulation',
  'curriculum',
  'event',
  'other',
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  calendar: 'Kalendar',
  form: 'Formular',
  regulation: 'Rregullore',
  curriculum: 'Kurrikul',
  event: 'Ngjarje',
  other: 'Tjera',
};

export interface DocumentFile {
  key: string;
  url: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  file: DocumentFile;
  contentType: string;
  size: number;
  category: DocumentCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentInput {
  name: string;
  fileKey: string;
  contentType: string;
  size: number;
  category: DocumentCategory;
}

export type UpdateDocumentInput = Partial<CreateDocumentInput>;

export interface ListDocumentsParams {
  page?: number;
  limit?: number;
  category?: DocumentCategory;
  search?: string;
  sort?: string;
}

export interface PaginatedDocuments {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  items: DocumentItem[];
}
