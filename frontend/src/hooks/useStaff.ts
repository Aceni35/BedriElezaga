import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { staffService } from '../services/staff.service';
import { getApiErrorMessage } from '../api/client';
import type { CreateStaffInput, ListStaffParams, UpdateStaffInput } from '../types/staff';

export function useStaffList(params: ListStaffParams = {}) {
  return useQuery({
    queryKey: queryKeys.staff.list(params),
    queryFn: () => staffService.list(params),
  });
}

export function useStaffItem(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.staff.detail(id ?? ''),
    queryFn: () => staffService.getById(id as string),
    enabled: !!id,
  });
}

export function useCreateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateStaffInput) => staffService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      toast.success('Anëtari u shtua');
    },
    onError: (err) => {
      toast.error('Shtimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useUpdateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateStaffInput }) =>
      staffService.update(id, input),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      qc.setQueryData(queryKeys.staff.detail(data.id), data);
      toast.success('Ndryshimet u ruajtën');
    },
    onError: (err) => {
      toast.error('Ruajtja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useDeleteStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffService.remove(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.staff.lists() });
      qc.removeQueries({ queryKey: queryKeys.staff.detail(id) });
      toast.success('Anëtari u fshi');
    },
    onError: (err) => {
      toast.error('Fshirja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
