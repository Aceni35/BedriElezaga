// home.jsx — Homepage (Tailwind)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import PH from './PH.jsx';
import ImageFit from './ImageFit.jsx';
import { Spinner } from '../ui/Spinner';
import { useNewsList } from '../hooks/useNews';
import { useSettings } from '../hooks/useSettings';
import { useI18n } from '../i18n/I18nContext';

const getSchoolYear = (now = new Date()) => {
  const start = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  return `${start} – ${start + 1}`;
};
const buildExcerpt = (body, max = 180) => {
  const first = Array.isArray(body) ? (body[0] ?? '') : '';
  return first.length > max ? first.slice(0, max).trimEnd() + '…' : first;
};

function Home() {
  const navigate = useNavigate();
  const { t, formatDate } = useI18n();
  const { data: newsData, isLoading: newsLoading } = useNewsList({ limit: 5, sort: '-publishedAt' });
  const { data: settings } = useSettings();
  const directorName = settings?.directorName?.trim() || '';
  const newsItems = newsData?.items ?? [];
  const lead = newsItems.slice(0, 1);
  const others = newsItems.slice(1, 5);
  const layout = window.__TWEAKS__?.homeLayout || 'editorial';
  const compact = layout === 'compact';

  const stats = [
    ['1929', t.home.statFounded],
    ['9',    t.home.statSchools],
    ['97+',  t.home.statYears],
  ];

  const values = [
    { icon: ICONS.heart,   ...t.home.valuesCare },
    { icon: ICONS.book,    ...t.home.valuesKnowledge },
    { icon: ICONS.users,   ...t.home.valuesCommunity },
    { icon: ICONS.sparkle, ...t.home.valuesCreativity },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="pointer-events-none absolute -top-52 -right-52 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative grid gap-16 items-center ' + (compact ? 'md:grid-cols-2' : 'md:grid-cols-[1.1fr_1fr]')}>
          <div className="max-w-[560px]">
            <div className={CX.eyebrow}>{t.home.schoolYear} {getSchoolYear()}</div>
            <h1 className={'font-display font-normal mt-5 mb-6 text-balance ' + (compact ? 'text-[clamp(38px,5vw,56px)]' : 'text-[clamp(44px,6vw,72px)]')}>
              {t.home.heroTitleA}<br/><em className="italic text-primary font-medium">{t.home.heroTitleB}</em>
            </h1>
            <p className="text-[18px] leading-relaxed text-ink-soft mb-8 max-w-[520px]" style={{ textWrap: 'pretty' }}>
              {t.home.heroSubtitle}
            </p>
            <div className="flex gap-3 flex-wrap mb-12">
              <button className={CX.btnPrimary} onClick={() => navigate('/about/history')}>{t.home.btnAboutUs} <Icon path={ICONS.arrowRight} size={14} /></button>
              <button className={CX.btnGhost} onClick={() => navigate('/news')}>{t.home.btnLatestNews}</button>
            </div>
            <div className="flex items-center gap-7">
              {stats.map(([v,l],i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-9 bg-line-strong" />}
                  <div>
                    <strong className="font-display text-4xl font-medium block leading-none">{v}</strong>
                    <span className="text-[13px] text-ink-soft mt-1.5 block">{l}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={'relative ' + (compact ? 'h-[480px]' : 'h-[580px]') + ' max-md:h-[400px]'}>
            <div className="absolute top-0 right-0 w-[75%] h-[85%] rounded-[28px] overflow-hidden shadow-lg">
              <PH label={t.home.photoYard} ratio="4/5" />
            </div>
            <div className="absolute bottom-0 left-0 w-[45%] rounded-[28px] overflow-hidden shadow-md" style={{ border: '6px solid var(--bg)' }}>
              <PH label={t.home.photoClass} ratio="1/1" />
            </div>
            <div className="absolute top-8 left-0 bg-surface border border-line px-4 py-2.5 rounded-full shadow-sm flex items-center gap-2 text-[13px] font-medium text-primary">
              <Icon path={ICONS.star} size={14} /> <span>{t.home.sinceBadge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section className="py-16 bg-surface">
        <div className={CX.container}>
          <div className="flex justify-center"><div className={CX.eyebrow}>{t.home.quotesEyebrow}</div></div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {t.history.quotes.map((q, i) => (
              <figure key={i} className="m-0 p-9 bg-bg border border-line rounded-[20px] transition-all hover:-translate-y-1 hover:shadow-md hover:border-line-strong">
                <div className="quote-mark text-7xl h-8 mb-2">"</div>
                <blockquote className="font-display text-xl leading-[1.35] mb-5 text-ink m-0" style={{ textWrap: 'pretty' }}>{q.text}</blockquote>
                <figcaption className="text-[13px] text-ink-soft font-medium">— {q.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24">
        <div className={CX.container + ' grid md:grid-cols-[1fr_1.1fr] gap-[72px] items-center'}>
          <div className="relative">
            <div className="rounded-[28px] shadow-md overflow-hidden"><PH label={t.home.photoClass} ratio="4/5" /></div>
            <div className="absolute bottom-6 left-6 bg-surface rounded-full px-4 py-2.5 flex items-center gap-2 text-[13px] font-medium text-primary shadow-md">
              <Icon path={ICONS.heart} size={14} /> <span>{t.home.introBadge}</span>
            </div>
          </div>
          <div>
            <div className={CX.eyebrow}>{t.home.introEyebrow}</div>
            <h2 className="text-[clamp(32px,4vw,48px)] mt-5 mb-6 text-balance">{t.home.introTitle}</h2>
            <p className="text-[19px] text-ink leading-relaxed mb-5" style={{ textWrap: 'pretty' }}>{t.home.introP1}</p>
            <p className="text-ink-soft leading-[1.7] mb-4">{t.home.introP2}</p>
            <p className="text-ink-soft leading-[1.7] mb-4">{t.home.introP3}</p>
            {directorName && (
              <div className="mt-8 pt-6 border-t border-line">
                <div className="font-display italic text-[28px] text-primary leading-none mb-1.5">{directorName}</div>
                <div className="text-[13px] text-ink-soft">{directorName} · {t.home.directorRole}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-20 bg-surface">
        <div className={CX.container}>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className={CX.eyebrow}>{t.home.newsEyebrow}</div>
              <h2 className="text-[clamp(28px,3.5vw,42px)] mt-3">{t.home.newsTitle}</h2>
            </div>
            <button onClick={() => navigate('/news')} className={CX.btnLink}>{t.common.seeAll} <Icon path={ICONS.arrowRight} size={14} className="arrow-slide" /></button>
          </div>

          {newsLoading && (
            <div className="py-16 flex justify-center text-primary">
              <Spinner size={28} />
            </div>
          )}

          {!newsLoading && newsItems.length === 0 && (
            <div className="py-16 text-center text-ink-soft text-sm border border-dashed border-line rounded-[20px]">
              {t.home.newsEmpty}
            </div>
          )}

          {!newsLoading && newsItems.length > 0 && (
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8">
              {lead.map(n => (
                <article key={n.id} onClick={() => navigate('/news/' + n.id)}
                  className="bg-bg border border-line rounded-[28px] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary-soft flex flex-col group">
                  <div className="relative">
                    {n.coverImage?.url
                      ? <ImageFit src={n.coverImage.url} alt={n.title} aspectRatio="4/3" />
                      : <PH label={n.title} ratio="4/3" />}
                    <div className="absolute top-5 left-5 bg-bg px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary">{t.news.categoryLabels[n.category] || n.category}</div>
                  </div>
                  <div className="p-8">
                    <div className="text-[13px] text-ink-soft flex items-center gap-2 mb-3.5"><Icon path={ICONS.calendar} size={13} /> {formatDate(n.publishedAt)}</div>
                    <h3 className="text-[28px] font-medium mb-3.5 leading-tight text-balance">{n.title}</h3>
                    <p className="text-ink-soft leading-relaxed mb-5">{buildExcerpt(n.body)}</p>
                    <div className={CX.btnLink}>{t.common.readMore} <Icon path={ICONS.arrowRight} size={14} className="arrow-slide" /></div>
                  </div>
                </article>
              ))}

              <div className="flex flex-col gap-5">
                {others.map(n => (
                  <article key={n.id} onClick={() => navigate('/news/' + n.id)}
                    className="bg-bg border border-line rounded-[20px] overflow-hidden cursor-pointer transition-all hover:translate-x-1 hover:shadow-md hover:border-primary-soft grid grid-cols-[120px_1fr] group">
                    <div>
                      {n.coverImage?.url
                        ? <ImageFit src={n.coverImage.url} alt={n.title} aspectRatio="1/1" />
                        : <PH label={n.title} ratio="1/1" className="h-full" />}
                    </div>
                    <div className="p-4 px-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={CX.chip}>{t.news.categoryLabels[n.category] || n.category}</span>
                        <span className="text-xs text-ink-soft">{formatDate(n.publishedAt)}</span>
                      </div>
                      <h4 className="font-display text-base font-medium leading-tight flex-1 m-0">{n.title}</h4>
                      <div className={CX.btnLink + ' text-[13px]'}>{t.common.readMore} <Icon path={ICONS.arrowRight} size={12} className="arrow-slide" /></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20">
        <div className={CX.container + ' grid sm:grid-cols-2 lg:grid-cols-4 gap-6'}>
          {values.map((v, i) => (
            <div key={i} className="p-8 rounded-[20px] bg-surface border border-line transition-all hover:-translate-y-1 hover:border-primary-soft hover:shadow-md">
              <div className="w-12 h-12 rounded-[14px] bg-primary-soft text-primary flex items-center justify-center mb-5"><Icon path={v.icon} size={22} /></div>
              <div className="font-display text-[22px] font-medium mb-2">{v.t}</div>
              <div className="text-ink-soft text-sm leading-normal">{v.d}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
