// Mission.jsx — About > Misioni dhe Vizioni sub-section
import React from 'react';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import { useI18n } from '../i18n/I18nContext';

function Mission() {
  const { t } = useI18n();
  const m = t.mission;

  return (
    <section className="py-16">
      <div className={CX.container}>
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-12 rounded-[28px] border border-line bg-surface">
            <div className="w-14 h-14 rounded-[14px] bg-primary-soft text-primary flex items-center justify-center mb-6"><Icon path={ICONS.heart} size={24} /></div>
            <div className={CX.eyebrow}>{m.missionEyebrow}</div>
            <h2 className="text-[clamp(24px,2.8vw,32px)] mt-4 mb-5 text-balance">{m.missionTitle}</h2>
            <p className="leading-[1.7] mb-3.5 opacity-90">{m.missionP1}</p>
            <p className="leading-[1.7] opacity-90">{m.missionP2}</p>
          </div>

          <div className="p-12 rounded-[28px] bg-primary text-white border border-primary">
            <div className="w-14 h-14 rounded-[14px] bg-white/15 text-accent flex items-center justify-center mb-6"><Icon path={ICONS.sparkle} size={24} /></div>
            <div className="inline-flex items-center text-[12px] font-semibold uppercase tracking-[.14em] text-accent"><span className="w-6 h-px bg-accent opacity-60 mr-2.5" />{m.visionEyebrow}</div>
            <h2 className="text-[clamp(24px,2.8vw,32px)] mt-4 mb-5 text-balance">{m.visionTitle}</h2>
            <p className="leading-[1.7] mb-3.5 opacity-90">{m.visionP1}</p>
            <p className="leading-[1.7] opacity-90">{m.visionP2}</p>
          </div>
        </div>

        <div className="max-w-[1040px] mx-auto py-10">
          <div className="flex justify-center"><div className={CX.eyebrow}>{m.valuesEyebrow}</div></div>
          <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-12 text-center">{m.valuesTitle}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {m.values.map((v, i) => (
              <div key={i} className="p-6 text-center">
                <div className="font-display text-sm text-primary font-semibold tracking-[.1em] mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-xl mb-2.5">{v.t}</h3>
                <p className="text-[13px] text-ink-soft leading-normal">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;
