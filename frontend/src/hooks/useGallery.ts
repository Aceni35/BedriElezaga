import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { galleryService } from '../services/gallery.service';
import { queryKeys } from '../api/queryKeys';
import type { GallerySection } from '../types/gallery';

export function useGallery() {
  return useQuery({
    queryKey: queryKeys.gallery.all,
    queryFn: () => galleryService.list(),
  });
}

export function useUpsertGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      section,
      category,
      pictureKey,
    }: {
      section: GallerySection;
      category: string;
      pictureKey: string;
    }) => galleryService.upsert(section, category, pictureKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all });
    },
  });
}

export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ section, category }: { section: GallerySection; category: string }) =>
      galleryService.remove(section, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all });
    },
  });
}
