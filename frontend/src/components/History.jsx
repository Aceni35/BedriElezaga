// History.jsx — About > Historiku sub-section
import React from 'react';
import { CX } from './constants.jsx';
import { useI18n } from '../i18n/I18nContext';

function History() {
  const { t } = useI18n();
  const h = t.history;

  return (
    <main className="page-in">
      {/* ── Intro: Chronicle Excerpt ── */}
      <section className="py-16">
        <div className={CX.container}>
          <div className="max-w-[760px] mx-auto text-center">
            <div className="flex justify-center"><div className={CX.eyebrow}>{h.extractEyebrow}</div></div>
            <h2 className="text-[clamp(32px,4vw,48px)] mt-4 mb-5 text-balance">
              {h.extractTitleA} <span className="text-primary">{h.extractTitleYear}</span>{h.extractTitleB}
            </h2>
            <p className="text-[18px] text-ink-soft leading-relaxed">{h.extractParagraph}</p>
          </div>

          {/* Branch schools */}
          <div className="mt-12 max-w-[860px] mx-auto">
            <div className="text-center text-sm uppercase tracking-[.14em] text-ink-soft font-semibold mb-5">
              {h.branchesLabel}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {h.branches.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-line text-sm text-ink font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Quick facts */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[960px] mx-auto">
            {[
              { k: '1869', l: h.fact1869L, s: h.fact1869S },
              { k: '1945', l: h.fact1945L, s: h.fact1945S },
              { k: '1961', l: h.fact1961L, s: h.fact1961S },
            ].map((f, i) => (
              <div key={i} className="bg-surface border border-line rounded-[20px] p-6 text-center">
                <div className="font-display text-[40px] font-medium text-primary leading-none mb-2">{f.k}</div>
                <div className="text-base font-medium mb-1">{f.l}</div>
                <div className="text-ink-soft text-sm">{f.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-12 border-t border-line">
        <div className={CX.container}>
          <div className="max-w-[720px] mx-auto mb-14 text-center">
            <div className="flex justify-center"><div className={CX.eyebrow}>{h.timelineEyebrow}</div></div>
            <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-4 text-balance">
              {h.timelineTitle}
            </h2>
            <p className="text-ink-soft leading-relaxed">{h.timelineSubtitle}</p>
          </div>

          <div className="timeline-rail relative max-w-[960px] mx-auto">
            {h.timeline.map((tt, i) => {
              const right = i % 2 === 1;
              return (
                <div key={i} className="grid grid-cols-[32px_1fr] md:grid-cols-[1fr_32px_1fr] gap-6 mb-10 items-center">
                  <div
                    className={
                      'bg-surface border border-line rounded-[20px] p-7 hover:border-primary hover:shadow-md transition-all ' +
                      (right ? 'md:col-start-3 col-start-2' : 'md:col-start-1 col-start-2')
                    }
                  >
                    <div className="font-display text-[26px] font-medium text-primary leading-none mb-2">{tt.year}</div>
                    <h3 className="text-lg mb-2.5">{tt.title}</h3>
                    <p className="text-ink-soft leading-relaxed text-sm">{tt.text}</p>
                  </div>
                  <div
                    className="md:col-start-2 col-start-1 row-start-1 md:row-auto w-4 h-4 rounded-full bg-primary mx-auto"
                    style={{ border: '4px solid var(--bg)', boxShadow: '0 0 0 1px var(--line-strong)' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Directors ── */}
      <section className="py-16 border-t border-line bg-surface">
        <div className={CX.container}>
          <div className="max-w-[720px] mx-auto mb-12 text-center">
            <div className="flex justify-center"><div className={CX.eyebrow}>{h.directorsEyebrow}</div></div>
            <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-4 text-balance">
              {h.directorsTitle}
            </h2>
            <p className="text-ink-soft leading-relaxed">{h.directorsSubtitle}</p>
          </div>

          <div className="max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {h.directors.map((d, i) => (
              <div
                key={i}
                className="bg-bg border border-line rounded-[16px] p-5 flex items-start gap-4 hover:border-primary transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-primary-soft text-primary font-display text-lg font-medium flex items-center justify-center flex-shrink-0">
                  {d.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-ink leading-tight mb-1">{d.name}</div>
                  <div className="text-sm text-primary font-medium mb-0.5">{d.period}</div>
                  {d.note && <div className="text-xs text-ink-soft">{d.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reflection / Addendum ── */}
      <section className="py-16 border-t border-line">
        <div className={CX.container}>
          <div className="max-w-[820px] mx-auto">
            <div className="flex justify-center"><div className={CX.eyebrow}>{h.addendumEyebrow}</div></div>
            <h2 className="text-[clamp(28px,3.5vw,40px)] mt-4 mb-3 text-balance text-center">
              {h.addendumTitle}
            </h2>
            <p className="text-ink-soft text-sm text-center mb-10 italic">
              {h.monographyNote}
            </p>

            <div className="space-y-5">
              {h.addendumParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    'leading-relaxed ' +
                    (i === h.addendumParagraphs.length - 1
                      ? 'text-ink font-medium border-l-4 border-primary pl-5 py-1 bg-primary-soft/40 rounded-r-lg'
                      : 'text-ink-soft')
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="pb-20">
        <div className={CX.container}>
          <div className="max-w-[800px] mx-auto text-center px-8 py-12 bg-primary-soft rounded-[28px]">
            <div className="quote-mark text-[96px] -mt-8 text-center">"</div>
            <blockquote className="font-display text-[clamp(22px,3vw,30px)] leading-[1.35] italic mb-5 text-balance m-0">
              {h.quoteText}
            </blockquote>
            <figcaption className="text-ink-soft text-sm">{h.quoteAuthor}</figcaption>
          </div>
        </div>
      </section>
    </main>
  );
}

export default History;
