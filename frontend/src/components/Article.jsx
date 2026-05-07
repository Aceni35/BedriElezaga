// Article.jsx — individual article view
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CX, ICONS } from './constants.jsx';
import Icon from './Icon.jsx';
import PH from './PH.jsx';
import ImageFit from './ImageFit.jsx';
import { Spinner } from '../ui/Spinner';
import { useNewsItem, useNewsList } from '../hooks/useNews';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { useI18n } from '../i18n/I18nContext';

const videoMime = (url) => {
  const ext = (url.split('?')[0].split('.').pop() || '').toLowerCase();
  if (ext === 'webm') return 'video/webm';
  if (ext === 'mov') return 'video/quicktime';
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg';
  return 'video/mp4';
};

const initialsOf = (name) =>
  (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

const readingMinutes = (body) => {
  const text = Array.isArray(body) ? body.join(' ') : '';
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const ICONS_EXTRA = {
  share: 'M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v13',
  image: 'M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5 5a2 2 0 100-4 2 2 0 000 4zm-3 9l5-7 4 5 3-3 4 5H5z',
  play: 'M8 5v14l11-7z',
  doc: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 0v6h6',
};

function useReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      setProgress(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

function Carousel({ children, ariaLabel, prevLabel, nextLabel }) {
  const scrollerRef = React.useRef(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const update = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(220, el.clientWidth * 0.7);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const btn = 'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-bg/95 backdrop-blur border border-line shadow-md flex items-center justify-center hover:border-primary hover:text-primary hover:scale-105 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none';

  return (
    <div className="relative" role="region" aria-label={ariaLabel}>
      <button type="button" aria-label={prevLabel} onClick={() => scroll(-1)} disabled={!canPrev} className={btn + ' -left-4'}>
        <Icon path={ICONS.chevronRight} size={14} className="rotate-180" />
      </button>
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-2 -mx-2 px-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="snap-start shrink-0">{child}</div>
        ))}
      </div>
      <button type="button" aria-label={nextLabel} onClick={() => scroll(1)} disabled={!canNext} className={btn + ' -right-4'}>
        <Icon path={ICONS.arrowRight} size={14} />
      </button>
    </div>
  );
}

function SectionHeader({ icon, title, count }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center">
        <Icon path={icon} size={16} />
      </span>
      <h3 className="font-display text-[20px] font-medium m-0">{title}</h3>
      {typeof count === 'number' && (
        <span className="ml-1 px-2.5 py-0.5 rounded-full bg-surface border border-line text-xs text-ink-soft font-medium">
          {count}
        </span>
      )}
    </div>
  );
}

function Article() {
  const navigate = useNavigate();
  const { t, formatDate } = useI18n();
  const a = t.article;
  const { id } = useParams();
  const { data: article, isLoading, isError, error } = useNewsItem(id);
  const { data: relatedData } = useNewsList({ limit: 4, sort: '-publishedAt' });
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);
  const progress = useReadingProgress();

  const fileNameFromKey = React.useCallback((key) => {
    if (!key) return a.fileFallback;
    const last = key.split('/').pop() || key;
    return decodeURIComponent(last);
  }, [a.fileFallback]);

  React.useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const handleShare = React.useCallback(async () => {
    if (!article) return;
    const url = window.location.href;
    const shareData = { title: article.title, text: article.title, url };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share(shareData); return; } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t.common.linkCopied);
    } catch {
      toast.error(t.common.linkCopyFailed);
    }
  }, [article, t.common.linkCopied, t.common.linkCopyFailed]);

  if (isLoading) {
    return (
      <main className="py-20">
        <div className={CX.container + ' flex justify-center text-primary'}>
          <Spinner size={28} />
        </div>
      </main>
    );
  }

  if (isError || !article) {
    const status = error?.response?.status;
    return (
      <main className="py-20">
        <div className={CX.container + ' max-w-[640px] text-center'}>
          <h1 className="text-3xl font-medium mb-4">{status === 404 ? a.notFoundTitle : a.errorTitle}</h1>
          <p className="text-ink-soft mb-8">{status === 404 ? a.notFoundMessage : a.errorMessage}</p>
          <button onClick={() => navigate('/news')} className={CX.btnPrimary}>
            <Icon path={ICONS.chevronRight} size={14} className="rotate-180" /> {a.backToAll}
          </button>
        </div>
      </main>
    );
  }

  const related = (relatedData?.items ?? []).filter((nn) => nn.id !== article.id).slice(0, 3);
  const bodyParagraphs = (article.body ?? []).filter((p) => p && p.trim().length > 0);
  const attachments = article.attachments ?? [];
  const imageAttachments = attachments.filter((x) => x.kind === 'image');
  const videoAttachments = attachments.filter((x) => x.kind === 'video');
  const documentAttachments = attachments.filter((x) => x.kind === 'document');
  const authorName = article.author?.fullName || a.editorFallbackName;
  const minutes = readingMinutes(article.body);

  const lightboxSlides = [
    ...imageAttachments.map((x) => ({ type: 'image', src: x.url })),
    ...videoAttachments.map((x) => ({
      type: 'video',
      width: 1280,
      height: 720,
      poster: article.coverImage?.url,
      sources: [{ src: x.url, type: videoMime(x.url) }],
    })),
  ];

  return (
    <main className="page-in pb-24">
      {/* ── Reading progress ── */}
      <div className="fixed top-[76px] left-0 right-0 h-0.5 bg-line/40 z-40 pointer-events-none">
        <div
          className="h-full bg-primary origin-left"
          style={{ transform: `scaleX(${progress})`, transition: 'transform 80ms linear' }}
        />
      </div>

      {/* ── Hero: cover + floating headline card ── */}
      <section className="relative">
        <div className="relative">
          {article.coverImage?.url
            ? <ImageFit src={article.coverImage.url} alt={article.title} aspectRatio="21/9" loading="eager" />
            : <PH label={article.title} ratio="21/9" />}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.20) 70%, var(--bg) 100%)' }}
          />
        </div>

        <div className={CX.container + ' relative -mt-16 sm:-mt-24 md:-mt-32'}>
          <div className="max-w-[860px] mx-auto bg-bg border border-line rounded-[28px] shadow-lg p-6 sm:p-9 md:p-11">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <button
                onClick={() => navigate('/news')}
                className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-primary transition-colors duration-200 group"
              >
                <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center group-hover:border-primary group-hover:-translate-x-0.5 transition-all duration-200">
                  <Icon path={ICONS.chevronRight} size={12} className="rotate-180" />
                </span>
                {a.allNews}
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-line text-sm text-ink-soft font-medium hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
              >
                <Icon path={ICONS_EXTRA.share} size={13} />
                {a.shareBtn}
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-[.10em]">
              {t.news.categoryLabels[article.category] || article.category}
            </span>

            <h1 className="font-display text-[clamp(30px,5vw,52px)] mt-5 mb-7 text-balance leading-[1.08]">
              {article.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-line">
              <div className="flex gap-3 items-center">
                <div className="w-11 h-11 rounded-full bg-primary text-white font-display text-sm font-medium flex items-center justify-center shadow-sm">
                  {initialsOf(authorName) || 'RB'}
                </div>
                <div>
                  <div className="font-medium text-sm leading-tight">{authorName}</div>
                  <div className="text-xs text-ink-soft mt-0.5">{a.editor}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Icon path={ICONS.calendar} size={13} />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="w-px h-4 bg-line" />
                <span className="inline-flex items-center gap-1.5">
                  <Icon path={ICONS.book} size={13} />
                  {minutes} {a.minutesRead}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="pt-14">
        <div className={CX.container}>
          <article className="max-w-[720px] mx-auto">
            {bodyParagraphs.map((p, i) =>
              i === 0 ? (
                <p
                  key={i}
                  className="text-[19px] leading-[1.8] text-ink mb-6 first-letter:font-display first-letter:font-semibold first-letter:text-primary first-letter:text-[72px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5"
                >
                  {p}
                </p>
              ) : (
                <p key={i} className="text-[17px] leading-[1.85] text-ink-soft mb-5">
                  {p}
                </p>
              )
            )}
          </article>
        </div>
      </section>

      {/* ── Attachments: gallery, video, documents ── */}
      {(imageAttachments.length > 0 || videoAttachments.length > 0 || documentAttachments.length > 0) && (
        <div className={CX.container + ' mt-16'}>
          <div className="max-w-[1040px] mx-auto space-y-12">
            {imageAttachments.length > 0 && (
              <div>
                <SectionHeader icon={ICONS_EXTRA.image} title={a.galleryTitle} count={imageAttachments.length} />
                <Carousel ariaLabel={a.galleryAria} prevLabel={t.common.back} nextLabel={t.common.next}>
                  {imageAttachments.map((x, i) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group relative block w-[200px] rounded-[16px] overflow-hidden bg-surface border border-line hover:border-primary hover:shadow-md transition-all duration-300 cursor-zoom-in"
                    >
                      <div className="overflow-hidden">
                        <div className="transition-transform duration-500 group-hover:scale-105">
                          <ImageFit src={x.url} alt="" aspectRatio="1/1" />
                        </div>
                      </div>
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </button>
                  ))}
                </Carousel>
              </div>
            )}

            {videoAttachments.length > 0 && (
              <div>
                <SectionHeader icon={ICONS_EXTRA.play} title={a.videoTitle} count={videoAttachments.length} />
                <Carousel ariaLabel={a.videoAria} prevLabel={t.common.back} nextLabel={t.common.next}>
                  {videoAttachments.map((x, i) => (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setLightboxIndex(imageAttachments.length + i)}
                      className="group relative w-[300px] rounded-[16px] overflow-hidden bg-black border border-line hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer"
                      style={{ aspectRatio: '16/9' }}
                    >
                      <video src={x.url} preload="metadata" muted className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.04]" />
                      <span
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 rounded-full bg-bg/95 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon path={ICONS_EXTRA.play} size={20} />
                        </span>
                      </span>
                    </button>
                  ))}
                </Carousel>
              </div>
            )}

            {documentAttachments.length > 0 && (
              <div>
                <SectionHeader icon={ICONS_EXTRA.doc} title={a.documentsTitle} count={documentAttachments.length} />
                <Carousel ariaLabel={a.documentsAria} prevLabel={t.common.back} nextLabel={t.common.next}>
                  {documentAttachments.map((x) => (
                    <a
                      key={x.key}
                      href={x.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 w-[280px] px-4 py-3.5 rounded-[16px] bg-surface border border-line hover:border-primary hover:bg-bg hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-primary-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon path={ICONS_EXTRA.doc} size={16} />
                      </span>
                      <span className="text-sm font-medium truncate flex-1 text-ink group-hover:text-primary transition-colors duration-200">
                        {fileNameFromKey(x.key)}
                      </span>
                      <Icon path={ICONS.arrowRight} size={13} className="text-ink-soft group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                    </a>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      )}

      {lightboxSlides.length > 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={Math.max(0, lightboxIndex)}
          slides={lightboxSlides}
          plugins={[Video, Counter, Thumbnails]}
          counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
          video={{ controls: true, playsInline: true }}
          carousel={{ finite: lightboxSlides.length <= 1 }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className={CX.container}>
            <div className="max-w-[1040px] mx-auto">
              <div className="flex items-end justify-between flex-wrap gap-6 mb-10 pt-12 border-t border-line">
                <div>
                  <div className={CX.eyebrow}>{a.relatedEyebrow}</div>
                  <h2 className="text-[clamp(26px,3.2vw,38px)] mt-3">{a.relatedTitle}</h2>
                </div>
                <button onClick={() => navigate('/news')} className={CX.btnLink}>
                  {a.relatedSeeAll} <Icon path={ICONS.arrowRight} size={14} className="arrow-slide" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((nn) => (
                  <article
                    key={nn.id}
                    onClick={() => navigate('/news/' + nn.id)}
                    className="group bg-surface border border-line rounded-[20px] overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-105">
                        {nn.coverImage?.url
                          ? <ImageFit src={nn.coverImage.url} alt={nn.title} aspectRatio="3/2" />
                          : <PH label={nn.title} ratio="3/2" />}
                      </div>
                      <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-bg/95 backdrop-blur text-xs font-semibold text-primary uppercase tracking-[.08em]">
                        {t.news.categoryLabels[nn.category] || nn.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-ink-soft mb-2 inline-flex items-center gap-1.5">
                        <Icon path={ICONS.calendar} size={11} />
                        {formatDate(nn.publishedAt)}
                      </div>
                      <h4 className="font-display text-[17px] font-medium leading-tight m-0 group-hover:text-primary transition-colors duration-200">
                        {nn.title}
                      </h4>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Article;
