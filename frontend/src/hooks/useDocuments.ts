import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { documentsService } from '../services/documents.service';
import { getApiErrorMessage } from '../api/client';
import type {
  CreateDocumentInput,
  ListDocumentsParams,
  UpdateDocumentInput,
} from '../types/documents';

export function useDocumentsList(params: ListDocumentsParams = {}) {
  return useQuery({
    queryKey: queryKeys.documents.list(params),
    queryFn: () => documentsService.list(params),
  });
}

export function useDocumentItem(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.documents.detail(id ?? ''),
    queryFn: () => documentsService.getById(id as string),
    enabled: !!id,
  });
}

export function useCreateDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateDocumentInput) => documentsService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      toast.success('Dokumenti u shtua');
    },
    onError: (err) => {
      toast.error('Shtimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useUpdateDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateDocumentInput }) =>
      documentsService.update(id, input),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      qc.setQueryData(queryKeys.documents.detail(data.id), data);
      toast.success('Ndryshimet u ruajtën');
    },
    onError: (err) => {
      toast.error('Ruajtja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentsService.remove(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.documents.lists() });
      qc.removeQueries({ queryKey: queryKeys.documents.detail(id) });
      toast.success('Dokumenti u fshi');
    },
    onError: (err) => {
      toast.error('Fshirja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
