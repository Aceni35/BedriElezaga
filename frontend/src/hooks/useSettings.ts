import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { settingsService } from '../services/settings.service';
import { getApiErrorMessage } from '../api/client';
import type { UpdateSettingsInput } from '../types/settings';

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsService.get(),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateSettingsInput) => settingsService.update(input),
    onSuccess: (data) => {
      qc.setQueryData(queryKeys.settings.all, data);
      toast.success('Cilësimet u ruajtën');
    },
    onError: (err) => {
      toast.error('Ruajtja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
