import React from 'react';
import { dictionaries, DATE_LOCALE, LANGS, type Dict, type Lang } from './translations';

const STORAGE_KEY = 'site.lang';
const DEFAULT_LANG: Lang = 'sq';

const isLang = (v: unknown): v is Lang =>
  v === 'sq' || v === 'en' || v === 'me';

const detect = (): Lang => {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  return DEFAULT_LANG;
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  dateLocale: string;
  formatDate: (iso: string | undefined | null) => string;
  langs: typeof LANGS;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(() => detect());

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = React.useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang];
    const locale = DATE_LOCALE[lang];
    const fmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    return {
      lang,
      setLang,
      t: dict,
      dateLocale: locale,
      formatDate: (iso) => (iso ? fmt.format(new Date(iso)) : ''),
      langs: LANGS,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

export function useT(): Dict {
  return useI18n().t;
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

// Maps a validation key (e.g. "errors.required") to its translated message.
// Falls back to the raw value if the key is not found.
export function tError(t: import('./translations').Dict, message: string | undefined): string {
  if (!message) return '';
  if (message.startsWith('errors.')) {
    const key = message.slice('errors.'.length) as keyof typeof t.admin.errors;
    return t.admin.errors[key] ?? message;
  }
  return message;
}
