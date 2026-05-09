import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '../api/queryKeys';
import { rulesService } from '../services/rules.service';
import { getApiErrorMessage } from '../api/client';
import type {
  CreateRuleInput,
  TranslateRulesInput,
  UpdateRuleInput,
} from '../types/rules';

export function useRulesList() {
  return useQuery({
    queryKey: queryKeys.rules.lists(),
    queryFn: () => rulesService.list(),
  });
}

export function useCreateRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateRuleInput) => rulesService.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rules.all });
      toast.success('Rregulla u shtua');
    },
    onError: (err) => {
      toast.error('Shtimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useUpdateRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateRuleInput }) =>
      rulesService.update(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rules.all });
      toast.success('Ndryshimet u ruajtën');
    },
    onError: (err) => {
      toast.error('Ruajtja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useDeleteRule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rulesService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rules.all });
      toast.success('Rregulla u fshi');
    },
    onError: (err) => {
      toast.error('Fshirja dështoi', { description: getApiErrorMessage(err) });
    },
  });
}

export function useTranslateRules() {
  return useMutation({
    mutationFn: (input: TranslateRulesInput) => rulesService.translate(input),
    onError: (err) => {
      toast.error('Përkthimi dështoi', { description: getApiErrorMessage(err) });
    },
  });
}
