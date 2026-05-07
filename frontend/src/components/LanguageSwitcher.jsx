// LanguageSwitcher.jsx — dropdown to switch between sq / en / me
import React from 'react';
import { ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import { useI18n } from '../i18n/I18nContext';

function LanguageSwitcher({ variant = 'nav' }) {
  const { lang, setLang, langs, t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const current = langs.find((l) => l.code === lang) || langs[0];

  if (variant === 'mobile') {
    return (
      <div className="pt-4 mt-2 border-t border-line">
        <div className="text-[11px] tracking-[.14em] uppercase text-primary font-semibold px-4 pb-2">{t.nav.language}</div>
        <div className="flex gap-2 px-4">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={
                'flex-1 px-3 py-2.5 rounded-full text-sm font-medium border transition-all ' +
                (l.code === lang
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface text-ink border-line hover:border-primary')
              }
            >
              {l.short}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex gap-2 mt-3">
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={
              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ' +
              (l.code === lang
                ? 'bg-white text-primary border-white'
                : 'border-white/30 text-white/80 hover:border-white hover:text-white')
            }
          >
            {l.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref} data-nav-item>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="px-3 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 text-ink hover:bg-surface hover:text-primary transition-all border border-line"
      >
        <span aria-hidden="true">🌐</span>
        <span>{current.short}</span>
        <Icon path={ICONS.arrowDown} size={12} className={'transition-transform ' + (open ? 'rotate-180' : '')} />
      </button>
      {open && (
        <div className="dd-in absolute top-[calc(100%+8px)] right-0 min-w-[170px] bg-surface border border-line rounded-[16px] shadow-lg p-1.5 z-50">
          {langs.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={
                  'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] text-left text-sm transition-colors ' +
                  (active ? 'bg-primary-soft text-primary font-semibold' : 'text-ink hover:bg-primary-soft hover:text-primary')
                }
              >
                <span>{l.label}</span>
                <span className="text-[11px] tracking-wider opacity-70">{l.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
