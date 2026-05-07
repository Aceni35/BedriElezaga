// Students.jsx — Nxënësit page shell (delegates to Schedule / Rules)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CX } from './constants.jsx';
import Schedule from './Schedule.jsx';
import Rules from './Rules.jsx';
import { useI18n } from '../i18n/I18nContext';

function Students() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { sub = 'orari' } = useParams();

  const tabs = [
    { id: 'orari',       label: t.students.tabSchedule },
    { id: 'rregullorja', label: t.students.tabRules },
  ];

  return (
    <main>
      <section className="relative overflow-hidden pt-[72px] pb-14 bg-surface border-b border-line">
        <div className="pointer-events-none absolute -top-36 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative'}>
          <div className={CX.eyebrow}>{t.students.eyebrow}</div>
          <h1 className="text-[clamp(40px,5vw,60px)] mt-4 mb-5 max-w-[860px] text-balance">{t.students.title}</h1>
          <p className="text-[18px] text-ink-soft max-w-[640px] leading-relaxed">{t.students.subtitle}</p>
        </div>
      </section>

      <div className={CX.container}>
        <div className="flex gap-1 py-6 flex-wrap border-b border-line">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => navigate('/students/' + tab.id)}
              className={'px-5 py-2.5 rounded-full text-sm font-medium transition-all ' + (sub === tab.id ? 'bg-primary text-white' : 'text-ink-soft hover:text-ink hover:bg-surface')}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {sub === 'orari' && <Schedule />}
      {sub === 'rregullorja' && <Rules />}
    </main>
  );
}

export default Students;
