export type Lang = 'sq' | 'en' | 'me';

export interface RuleTranslated {
  sq: string;
  en: string;
  me: string;
}

export interface Rule {
  id: string;
  order: number;
  title: RuleTranslated;
  items: RuleTranslated[];
  createdAt: string;
  updatedAt: string;
}

export interface RulesList {
  items: Rule[];
}

export interface CreateRuleInput {
  title: RuleTranslated;
  items: RuleTranslated[];
  order?: number;
}

export type UpdateRuleInput = Partial<CreateRuleInput>;

export interface TranslateRulesInput {
  source: Lang;
  texts: string[];
}

export interface TranslateRulesResponse {
  translations: RuleTranslated[];
}
