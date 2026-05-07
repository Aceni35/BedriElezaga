// documents.jsx — Public Documents page (read-only, paginated, searchable)
import React from 'react';
import { CX } from './constants.jsx';
import Icon from './Icon.jsx';
import { useDocumentsList } from '../hooks/useDocuments';
import { documentsService } from '../services/documents.service';
import { DOCUMENT_CATEGORIES } from '../types/documents';
import { Spinner } from '../ui/Spinner';
import { getApiErrorMessage } from '../api/client';
import { useI18n, interpolate } from '../i18n/I18nContext';

const ALL = 'all';
const PAGE_SIZE = 12;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function fileBadge(contentType) {
  if (contentType === 'application/pdf') return 'PDF';
  if (contentType === 'application/msword') return 'DOC';
  if (
    contentType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'DOCX';
  return 'FILE';
}

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function Documents() {
  const { t } = useI18n();
  const d = t.documents;
  const [filter, setFilter] = React.useState(ALL);
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  const [page, setPage] = React.useState(1);

  const formatDate = React.useCallback((iso) => {
    const date = new Date(iso);
    return `${date.getDate()} ${d.months[date.getMonth()]} ${date.getFullYear()}`;
  }, [d.months]);

  // Reset to page 1 when filter or search changes.
  React.useEffect(() => { setPage(1); }, [filter, debouncedSearch]);

  const { data, isLoading, isError, error } = useDocumentsList({
    page,
    limit: PAGE_SIZE,
    category: filter === ALL ? undefined : filter,
    search: debouncedSearch.trim() || undefined,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const pluralize = (count, one, other) => (count === 1 ? one : other);

  return (
    <main>
      <section className="relative overflow-hidden pt-[72px] pb-14 bg-surface border-b border-line">
        <div className="pointer-events-none absolute -top-36 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--primary-soft), transparent 70%)', opacity: 0.6 }} />
        <div className={CX.container + ' relative'}>
          <div className={CX.eyebrow}>{d.eyebrow}</div>
          <h1 className="text-[clamp(40px,5vw,60px)] mt-4 mb-5 max-w-[860px] text-balance">{d.title}</h1>
          <p className="text-[18px] text-ink-soft max-w-[640px] leading-relaxed">{d.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className={CX.container}>
          <div className="mb-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-[clamp(24px,2.8vw,32px)]">{d.libraryTitle}</h2>
              <div className="text-sm text-ink-soft mt-1.5">{total} {pluralize(total, t.common.document_one, t.common.document_other)}</div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={d.searchPlaceholder}
                  className="pl-9 pr-3 py-2.5 rounded-full bg-surface border border-line focus:border-primary focus:outline-none text-sm w-56"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">
                  <Icon path="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5 flex gap-2 flex-wrap">
            {[ALL, ...DOCUMENT_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={CX.chip + ' ' + CX.chipClickable + ' ' + (filter === c ? CX.chipActive : '')}
              >
                {c === ALL ? d.allFilter : (d.categoryLabels[c] || c)}
              </button>
            ))}
          </div>

          {isError && (
            <div className="px-4 py-3 mb-4 text-sm rounded-xl bg-red-50 text-red-700 border border-red-200">
              {getApiErrorMessage(error)}
            </div>
          )}

          <div className="bg-surface border border-line rounded-[20px] overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_120px_140px_100px] max-md:grid-cols-[1fr_100px] gap-4 px-6 py-3.5 bg-surface2 text-[11px] uppercase tracking-[.1em] text-ink-soft font-semibold border-b border-line">
              <div>{d.colName}</div>
              <div className="max-md:hidden">{d.colCategory}</div>
              <div className="max-md:hidden">{d.colSize}</div>
              <div className="max-md:hidden">{d.colDate}</div>
              <div className="text-right">{d.colActions}</div>
            </div>

            {isLoading && (
              <div className="py-16 flex justify-center text-primary">
                <Spinner size={28} />
              </div>
            )}

            {!isLoading && items.length === 0 && (
              <div className="py-16 text-center text-ink-soft">
                {debouncedSearch.trim() ? d.emptyForSearch : d.emptyForCategory}
              </div>
            )}

            {!isLoading && items.map((doc) => (
              <div key={doc.id} className="grid grid-cols-[1fr_120px_120px_140px_100px] max-md:grid-cols-[1fr_100px] gap-4 px-6 py-4 border-b border-line last:border-b-0 items-center hover:bg-bg transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-primary-soft text-primary">
                    <Icon path="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6M9 9h2" size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-ink truncate flex items-center gap-2">
                      {doc.name}
                      <span className="text-[10px] uppercase tracking-wider text-ink-soft bg-bg border border-line px-1.5 py-0.5 rounded">{fileBadge(doc.contentType)}</span>
                    </div>
                    <div className="md:hidden text-[12px] text-ink-soft mt-0.5">{d.categoryLabels[doc.category] || doc.category} · {formatBytes(doc.size)} · {formatDate(doc.createdAt)}</div>
                  </div>
                </div>
                <div className="max-md:hidden"><span className={CX.chip}>{d.categoryLabels[doc.category] || doc.category}</span></div>
                <div className="max-md:hidden text-[13px] text-ink-soft">{formatBytes(doc.size)}</div>
                <div className="max-md:hidden text-[13px] text-ink-soft">{formatDate(doc.createdAt)}</div>
                <div className="flex justify-end gap-1">
                  {doc.file?.url && (
                    <>
                      <a
                        href={doc.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full hover:bg-primary-soft hover:text-primary flex items-center justify-center text-ink-soft transition-colors"
                        title={d.actionView}
                      >
                        <Icon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z" size={16} />
                      </a>
                      <a
                        href={documentsService.downloadUrl(doc.id)}
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-primary text-white hover:bg-primary-deep flex items-center justify-center transition-colors"
                        title={d.actionDownload}
                      >
                        <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={16} />
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full text-sm border border-line disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
              >
                ← {t.common.back}
              </button>
              <span className="text-sm text-ink-soft">
                {t.common.page} {page} {t.common.of} {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-full text-sm border border-line disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
              >
                {t.common.next} →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Documents;
