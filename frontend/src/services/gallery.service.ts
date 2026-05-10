import { apiClient } from '../api/client';
import type { GalleryItem, GalleryListResponse, GallerySection } from '../types/gallery';

export const galleryService = {
  async list(section?: GallerySection): Promise<GalleryListResponse> {
    const { data } = await apiClient.get<GalleryListResponse>('/gallery', {
      params: section ? { section } : undefined,
    });
    return data;
  },

  async upsert(section: GallerySection, category: string, pictureKey: string): Promise<GalleryItem> {
    const { data } = await apiClient.put<GalleryItem>(
      `/gallery/${section}/${category}`,
      { pictureKey }
    );
    return data;
  },

  async remove(section: GallerySection, category: string): Promise<void> {
    await apiClient.delete(`/gallery/${section}/${category}`);
  },
};
