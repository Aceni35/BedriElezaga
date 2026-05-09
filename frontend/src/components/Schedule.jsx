// Schedule.jsx — weekly class schedule (downloadable PDF)
import React from 'react';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import { useSettings } from '../hooks/useSettings';
import { useI18n } from '../i18n/I18nContext';

function Schedule() {
  const { t } = useI18n();
  const s = t.schedule;
  const { data: settings } = useSettings();
  const timetableFile = settings?.timetable ?? null;

  return (
    <section className="py-12">
      <div className={CX.container}>
        <div className="max-w-180 mb-8">
          <div className={CX.eyebrow}>{s.eyebrow}</div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-4 text-balance">{s.title}</h2>
          <p className="text-[17px] text-ink-soft leading-relaxed">{s.subtitle}</p>
        </div>

        <div className="p-7 bg-primary text-white rounded-[20px] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-white/15 flex items-center justify-center"><Icon path={ICONS.calendar} size={22} /></div>
            <div>
              <div className="font-display text-lg font-medium">{s.cardTitle}</div>
              <div className="text-sm opacity-80">{s.cardUpdated}</div>
            </div>
          </div>
          {timetableFile ? (
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={timetableFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white/15 text-white hover:bg-white/25 transition-all"
              >
                <Icon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" size={14} />
                {s.btnView}
              </a>
              <a
                href={timetableFile.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white text-primary hover:bg-accent-soft transition-all"
              >
                {s.btnDownload} <Icon path={ICONS.arrowRight} size={14} />
              </a>
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-white/40 text-primary/60 cursor-not-allowed"
            >
              {s.btnUnavailable}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
