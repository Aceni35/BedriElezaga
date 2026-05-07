import { apiClient } from '../api/client';
import type { Settings, UpdateSettingsInput } from '../types/settings';

export const settingsService = {
  async get(): Promise<Settings> {
    const { data } = await apiClient.get<Settings>('/settings');
    return data;
  },

  async update(input: UpdateSettingsInput): Promise<Settings> {
    const { data } = await apiClient.patch<Settings>('/settings', input);
    return data;
  },
};
