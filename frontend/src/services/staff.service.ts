import { apiClient } from '../api/client';
import type {
  CreateStaffInput,
  ListStaffParams,
  PaginatedStaff,
  Staff,
  UpdateStaffInput,
} from '../types/staff';

export const staffService = {
  async list(params: ListStaffParams = {}): Promise<PaginatedStaff> {
    const { data } = await apiClient.get<PaginatedStaff>('/staff', { params });
    return data;
  },

  async getById(id: string): Promise<Staff> {
    const { data } = await apiClient.get<Staff>(`/staff/${id}`);
    return data;
  },

  async create(input: CreateStaffInput): Promise<Staff> {
    const { data } = await apiClient.post<Staff>('/staff', input);
    return data;
  },

  async update(id: string, input: UpdateStaffInput): Promise<Staff> {
    const { data } = await apiClient.patch<Staff>(`/staff/${id}`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/staff/${id}`);
  },
};
