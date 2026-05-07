import { apiClient } from '../api/client';
import type {
  CreateDocumentInput,
  DocumentItem,
  ListDocumentsParams,
  PaginatedDocuments,
  UpdateDocumentInput,
} from '../types/documents';

export const documentsService = {
  async list(params: ListDocumentsParams = {}): Promise<PaginatedDocuments> {
    const { data } = await apiClient.get<PaginatedDocuments>('/documents', { params });
    return data;
  },

  downloadUrl(id: string): string {
    const base = apiClient.defaults.baseURL ?? '';
    return `${base}/documents/${id}/download`;
  },

  async getById(id: string): Promise<DocumentItem> {
    const { data } = await apiClient.get<DocumentItem>(`/documents/${id}`);
    return data;
  },

  async create(input: CreateDocumentInput): Promise<DocumentItem> {
    const { data } = await apiClient.post<DocumentItem>('/documents', input);
    return data;
  },

  async update(id: string, input: UpdateDocumentInput): Promise<DocumentItem> {
    const { data } = await apiClient.patch<DocumentItem>(`/documents/${id}`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  },
};
