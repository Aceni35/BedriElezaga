export const NEWS_CATEGORIES = ['Arritje', 'Ngjarje', 'Lajme', 'Projekte', 'Sport', 'Tjera'] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const ATTACHMENT_KINDS = ['image', 'video', 'document'] as const;
export type AttachmentKind = (typeof ATTACHMENT_KINDS)[number];

export interface NewsAttachmentInput {
  kind: AttachmentKind;
  key: string;
}

export interface NewsAttachment extends NewsAttachmentInput {
  url: string;
}

export interface NewsCoverImage {
  key: string;
  url: string;
}

export interface NewsAuthor {
  id: string;
  fullName: string;
}

export interface News {
  id: string;
  title: string;
  body: string[];
  bodyHtml: string;
  coverImage: NewsCoverImage;
  category: NewsCategory;
  author: NewsAuthor;
  publishedAt: string;
  attachments: NewsAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsInput {
  title: string;
  body?: string[];
  bodyHtml?: string;
  coverImageKey: string;
  category: NewsCategory;
  publishedAt?: string;
  attachments?: NewsAttachmentInput[];
}

export type UpdateNewsInput = Partial<CreateNewsInput>;

export interface ListNewsParams {
  page?: number;
  limit?: number;
  category?: NewsCategory;
  search?: string;
  sort?: string;
}

export interface PaginatedNews {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  items: News[];
}
