import { apiClient } from '../api/client';
import type {
  CreateNewsInput,
  ListNewsParams,
  News,
  PaginatedNews,
  UpdateNewsInput,
} from '../types/news';

export const newsService = {
  async list(params: ListNewsParams = {}): Promise<PaginatedNews> {
    const { data } = await apiClient.get<PaginatedNews>('/news', { params });
    return data;
  },

  async getById(id: string): Promise<News> {
    const { data } = await apiClient.get<News>(`/news/${id}`);
    return data;
  },

  async create(input: CreateNewsInput): Promise<News> {
    const { data } = await apiClient.post<News>('/news', input);
    return data;
  },

  async update(id: string, input: UpdateNewsInput): Promise<News> {
    const { data } = await apiClient.patch<News>(`/news/${id}`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/news/${id}`);
  },
};
