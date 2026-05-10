// About.jsx — About page shell (delegates to Overview / History / Mission)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CX } from './constants.jsx';
import History from './History.jsx';
import Mission from './Mission.jsx';
import { useGallery } from '../hooks/useGallery';
import { useI18n } from '../i18n/I18nContext';

function About() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { sub = 'overview' } = useParams();

  const tabs = [
    { id: 'history', label: t.about.tabHistory },
    { id: 'mission', label: t.about.tabMission },
  ];

  const { data: galleryData } = useGallery();
  const aboutImage = React.useMemo(() => {
    const items = galleryData?.items ?? [];
    return items.find((i) => i.section === 'about' && i.category === sub) || null;
  }, [galleryData, sub]);

  return (
    <main>
      <section className="relative overflow-hidden pt-[72px] pb-14 bg-surface border-b border-line">
        <div className="pointer-events-none absolute -top-36 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative'}>
          <div className={'grid gap-10 items-center ' + (aboutImage ? 'lg:grid-cols-[1fr_minmax(280px,420px)]' : '')}>
            <div>
              <div className={CX.eyebrow}>{t.about.eyebrow}</div>
              <h1 className="text-[clamp(40px,5vw,60px)] mt-4 mb-5 max-w-[860px] text-balance">{t.about.title}</h1>
              <p className="text-[18px] text-ink-soft max-w-[640px] leading-relaxed">{t.about.subtitle}</p>
            </div>
            {aboutImage && (
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-sm border border-line bg-bg">
                <img
                  src={aboutImage.picture.url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={CX.container}>
        <div className="flex gap-1 py-6 flex-wrap border-b border-line">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => navigate('/about/' + tab.id)}
              className={'px-5 py-2.5 rounded-full text-sm font-medium transition-all ' + (sub === tab.id ? 'bg-primary text-white' : 'text-ink-soft hover:text-ink hover:bg-surface')}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {sub === 'history' && <History />}
      {sub === 'mission' && <Mission />}
    </main>
  );
}

export default About;
