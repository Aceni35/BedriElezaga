import { apiClient } from '../api/client';
import type { AuthResponse, ChangePasswordInput, LoginInput } from '../types/auth';

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', input);
    return data;
  },

  async changePassword(input: ChangePasswordInput): Promise<void> {
    await apiClient.post('/auth/change-password', input);
  },
};
