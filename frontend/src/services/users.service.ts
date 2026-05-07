import { apiClient } from '../api/client';
import type {
  CreateUserInput,
  ListUsersParams,
  ManagedUser,
  PaginatedUsers,
  UpdateUserRoleInput,
} from '../types/users';

export const usersService = {
  async list(params: ListUsersParams = {}): Promise<PaginatedUsers> {
    const { data } = await apiClient.get<PaginatedUsers>('/users', { params });
    return data;
  },

  async create(input: CreateUserInput): Promise<ManagedUser> {
    const { data } = await apiClient.post<ManagedUser>('/users', input);
    return data;
  },

  async updateRole(id: string, input: UpdateUserRoleInput): Promise<ManagedUser> {
    const { data } = await apiClient.patch<ManagedUser>(`/users/${id}/role`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
