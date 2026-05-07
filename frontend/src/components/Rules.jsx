// Rules.jsx — school rules / regulations section
import React from 'react';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import { useSettings } from '../hooks/useSettings';
import { useI18n } from '../i18n/I18nContext';

function Rules() {
  const { t } = useI18n();
  const r = t.rules;
  const { data: settings } = useSettings();
  const rulesFile = settings?.rules ?? null;

  return (
    <section className="py-12">
      <div className={CX.container}>
        <div className="max-w-[720px] mb-10">
          <div className={CX.eyebrow}>{r.eyebrow}</div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-4 text-balance">{r.title}</h2>
          <p className="text-[17px] text-ink-soft leading-relaxed">{r.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {r.sections.map((s, i) => (
            <div key={i} className="p-7 bg-surface border border-line rounded-[20px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-display font-semibold text-sm">{String(i+1).padStart(2,'0')}</div>
                <h3 className="text-xl">{s.t}</h3>
              </div>
              <ul className="space-y-2.5">
                {s.items.map((it, j) => (
                  <li key={j} className="grid grid-cols-[14px_1fr] gap-3 text-sm text-ink-soft leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <div>{it}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-7 bg-primary text-white rounded-[20px] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-white/15 flex items-center justify-center"><Icon path={ICONS.book} size={22} /></div>
            <div>
              <div className="font-display text-lg font-medium">{r.fullPdfTitle}</div>
              <div className="text-sm opacity-80">{r.fullPdfMeta}</div>
            </div>
          </div>
          {rulesFile ? (
            <a
              href={rulesFile.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white text-primary hover:bg-accent-soft transition-all"
            >
              {r.btnDownload} <Icon path={ICONS.arrowRight} size={14} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white/40 text-primary/60 cursor-not-allowed"
            >
              {r.btnUnavailable}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Rules;
