import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { newsService } from '../services/news.service';
import { getApiErrorMessage } from '../api/client';
import type { CreateNewsInput, ListNewsParams, UpdateNewsInput } from '../types/news';

export function useNewsList(params: ListNewsParams = {}) {
  return useQuery({
    queryKey: queryKeys.news.list(params),
    queryFn: () => newsService.list(params),
  });
}

export function useNewsItem(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.news.detail(id ?? ''),
    queryFn: () => newsService.getById(id as string),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateNewsInput) => newsService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.news.lists() });
      toast.success('Lajmi u publikua');
    },
    onError: (err) => {
      toast.error('Publikimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateNewsInput }) =>
      newsService.update(id, input),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.news.lists() });
      qc.setQueryData(queryKeys.news.detail(data.id), data);
      toast.success('Ndryshimet u ruajtën');
    },
    onError: (err) => {
      toast.error('Ruajtja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => newsService.remove(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.news.lists() });
      qc.removeQueries({ queryKey: queryKeys.news.detail(id) });
      toast.success('Lajmi u fshi');
    },
    onError: (err) => {
      toast.error('Fshirja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
