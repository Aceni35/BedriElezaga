// News.jsx — news index page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import PH from './PH.jsx';
import ImageFit from './ImageFit.jsx';
import { Spinner } from '../ui/Spinner';
import { useNewsList } from '../hooks/useNews';
import { NEWS_CATEGORIES } from '../types/news';
import { useI18n, interpolate } from '../i18n/I18nContext';

const PAGE_SIZE = 7;

const buildExcerpt = (body, max = 180) => {
  const first = Array.isArray(body) ? (body[0] ?? '') : '';
  return first.length > max ? first.slice(0, max).trimEnd() + '…' : first;
};

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function buildPageList(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('…');
    out.push(sorted[i]);
  }
  return out;
}

function News() {
  const navigate = useNavigate();
  const { t, formatDate } = useI18n();
  const n = t.news;
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => { setPage(1); }, [filter, debouncedSearch]);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const trimmedSearch = debouncedSearch.trim();
  const params = {
    page,
    limit: PAGE_SIZE,
    sort: '-publishedAt',
    ...(filter !== 'all' ? { category: filter } : {}),
    ...(trimmedSearch ? { search: trimmedSearch } : {}),
  };
  const { data, isLoading, isError } = useNewsList(params);
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const cats = ['all', ...NEWS_CATEGORIES];

  return (
    <main>
      <section className="relative overflow-hidden pt-[72px] pb-14 bg-surface border-b border-line">
        <div className="pointer-events-none absolute -top-36 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative'}>
          <div className={CX.eyebrow}>{n.eyebrow}</div>
          <h1 className="text-[clamp(40px,5vw,60px)] mt-4 mb-5 max-w-[860px] text-balance">{n.title}</h1>
          <p className="text-[18px] text-ink-soft max-w-[640px] leading-relaxed">{n.subtitle}</p>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className={CX.container}>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex gap-2 flex-wrap">
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={CX.chip + ' ' + CX.chipClickable + ' ' + (filter === c ? CX.chipActive : '')}>
                  {c === 'all' ? n.allFilter : (n.categoryLabels[c] || c)}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={n.searchPlaceholder}
                className="pl-9 pr-3 py-2.5 rounded-full bg-surface border border-line focus:border-primary focus:outline-none text-sm w-64"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none">
                <Icon path="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" size={14} />
              </span>
            </div>
          </div>
          <div className="mb-10" />

          {isLoading && (
            <div className="py-16 flex justify-center text-primary">
              <Spinner size={28} />
            </div>
          )}

          {isError && !isLoading && (
            <div className="py-16 text-center text-ink-soft text-sm border border-dashed border-line rounded-[20px]">
              {n.loadError}
            </div>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <div className="py-16 text-center text-ink-soft text-sm border border-dashed border-line rounded-[20px]">
              {trimmedSearch ? interpolate(n.emptyForSearch, { q: trimmedSearch }) : n.emptyDefault}
            </div>
          )}

          {!isLoading && !isError && items.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {items.map((item, i) => {
                  const isHero = i === 0 && filter === 'all' && page === 1 && !trimmedSearch;
                  return (
                    <article
                      key={item.id}
                      onClick={() => navigate('/news/' + item.id)}
                      className={
                        'group bg-surface border border-line rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary ' +
                        (isHero ? 'sm:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.25fr_1fr] lg:flex-row' : '')
                      }
                    >
                      <div className="relative overflow-hidden">
                        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                          {item.coverImage?.url
                            ? <ImageFit src={item.coverImage.url} alt={item.title} aspectRatio={isHero ? '16/9' : '3/2'} />
                            : <PH label={item.title} ratio={isHero ? '16/9' : '3/2'} />}
                        </div>
                        <span
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.25) 100%)' }}
                        />
                        <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-bg/95 backdrop-blur text-[11px] font-semibold text-primary uppercase tracking-[.10em] shadow-sm">
                          {n.categoryLabels[item.category] || item.category}
                        </span>
                      </div>

                      <div className={'p-6 flex-1 flex flex-col ' + (isHero ? 'lg:p-10 lg:justify-center' : '')}>
                        <div className="inline-flex items-center gap-1.5 text-xs text-ink-soft font-medium mb-3.5">
                          <Icon path={ICONS.calendar} size={12} />
                          {formatDate(item.publishedAt)}
                        </div>

                        <h3
                          className={
                            'font-display font-medium mb-3 leading-tight text-balance group-hover:text-primary transition-colors duration-200 m-0 ' +
                            (isHero ? 'text-[clamp(24px,3vw,36px)]' : 'text-[20px]')
                          }
                        >
                          {item.title}
                        </h3>

                        <p className={'text-ink-soft leading-relaxed mb-5 flex-1 m-0 line-clamp-3 ' + (isHero ? 'text-[15px]' : 'text-sm')}>
                          {buildExcerpt(item.body, isHero ? 240 : 160)}
                        </p>

                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-line mt-auto">
                          <span className="text-sm font-medium text-primary">{n.readArticle}</span>
                          <span className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                            <Icon path={ICONS.arrowRight} size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav aria-label={n.paginationLabel} className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                  <button
                    type="button"
                    aria-label={n.prevPageAria}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-full border border-line bg-surface text-ink flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <Icon path={ICONS.chevronRight} size={14} className="rotate-180" />
                  </button>
                  {buildPageList(page, totalPages).map((p, i) =>
                    p === '…' ? (
                      <span key={`gap-${i}`} className="w-10 h-10 flex items-center justify-center text-ink-soft text-sm select-none">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={
                          'w-10 h-10 rounded-full border text-sm font-medium transition-all ' +
                          (p === page
                            ? 'bg-primary text-white border-primary'
                            : 'bg-surface text-ink border-line hover:border-primary hover:text-primary')
                        }
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    aria-label={n.nextPageAria}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="w-10 h-10 rounded-full border border-line bg-surface text-ink flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <Icon path={ICONS.arrowRight} size={14} />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default News;
