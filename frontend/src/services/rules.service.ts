import { apiClient } from '../api/client';
import type {
  CreateRuleInput,
  Rule,
  RulesList,
  TranslateRulesInput,
  TranslateRulesResponse,
  UpdateRuleInput,
} from '../types/rules';

export const rulesService = {
  async list(): Promise<RulesList> {
    const { data } = await apiClient.get<RulesList>('/rules');
    return data;
  },

  async create(input: CreateRuleInput): Promise<Rule> {
    const { data } = await apiClient.post<Rule>('/rules', input);
    return data;
  },

  async update(id: string, input: UpdateRuleInput): Promise<Rule> {
    const { data } = await apiClient.patch<Rule>(`/rules/${id}`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/rules/${id}`);
  },

  async translate(input: TranslateRulesInput): Promise<TranslateRulesResponse> {
    const { data } = await apiClient.post<TranslateRulesResponse>('/rules/translate', input);
    return data;
  },
};
