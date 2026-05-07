import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { usersService } from '../services/users.service';
import { getApiErrorMessage } from '../api/client';
import type {
  CreateUserInput,
  ListUsersParams,
  UpdateUserRoleInput,
} from '../types/users';

export function useUsersList(params: ListUsersParams = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => usersService.list(params),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => usersService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast.success('Përdoruesi u shtua');
    },
    onError: (err) => {
      toast.error('Shtimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useUpdateUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserRoleInput }) =>
      usersService.updateRole(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast.success('Roli u përditësua');
    },
    onError: (err) => {
      toast.error('Përditësimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast.success('Përdoruesi u fshi');
    },
    onError: (err) => {
      toast.error('Fshirja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
