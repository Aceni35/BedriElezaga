import { useState } from "react";
import { useDeleteDocument, useDocumentsList } from "../hooks/useDocuments";
import { getApiErrorMessage } from "../api/client";
import { Spinner } from "../ui/Spinner";
import { Select } from "../ui/Select";
import { DocumentsCreateModal } from "./DocumentsCreateModal";
import { DocumentsEditModal } from "./DocumentsEditModal";
import { DOCUMENT_CATEGORIES, type DocumentCategory } from "../types/documents";
import { useI18n, interpolate } from "../i18n/I18nContext";

const ALL = "all";

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

function fileLabel(contentType: string): string {
  if (contentType === "application/pdf") return "PDF";
  if (contentType === "application/msword") return "DOC";
  if (
    contentType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "DOCX";
  return contentType;
}

export function DocumentsListPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<DocumentCategory | typeof ALL>(ALL);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const limit = 10;
  const { t } = useI18n();
  const a = t.admin;

  const { data, isLoading, isError, error } = useDocumentsList({
    page,
    limit,
    category: category === ALL ? undefined : category,
  });
  const deleteDocument = useDeleteDocument();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(interpolate(a.common.confirmDelete, { name }))) return;
    deleteDocument.mutate(id);
  };

  const categoryOptions = [
    { value: ALL, label: t.documents.allFilter },
    ...DOCUMENT_CATEGORIES.map((c) => ({
      value: c,
      label: t.documents.categoryLabels[c] || c,
    })),
  ];

  return (
    <div className="px-8 py-10 max-w-[1100px]">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">{a.documents.title}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {data ? interpolate(a.common.totalDocuments, { n: data.total }) : " "}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep transition-colors whitespace-nowrap"
        >
          {a.documents.newButton}
        </button>
      </div>

      <div className="mb-6 max-w-xs">
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v as DocumentCategory | typeof ALL);
            setPage(1);
          }}
          options={categoryOptions}
          ariaLabel={a.common.categoryFilter}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-10 text-primary">
          <Spinner size={28} />
        </div>
      )}
      {isError && (
        <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
          {getApiErrorMessage(error)}
        </div>
      )}

      {data && data.items.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-ink-soft border border-dashed border-line rounded-xl">
          {a.documents.empty}
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <ul className="divide-y divide-line border border-line rounded-xl overflow-hidden">
            {data.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-3 bg-bg hover:bg-surface transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center shrink-0 text-ink-soft">
                  <DocumentIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-xs text-ink-soft mt-0.5 flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface border border-line">
                      {t.documents.categoryLabels[item.category] || item.category}
                    </span>
                    <span>{fileLabel(item.contentType)}</span>
                    <span>· {formatBytes(item.size)}</span>
                    <span>
                      · {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {item.file?.url && (
                    <a
                      href={item.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-line hover:border-primary hover:text-primary transition-colors"
                    >
                      {a.common.browse}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditingId(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-line hover:border-primary hover:text-primary transition-colors"
                  >
                    {a.common.edit}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    disabled={
                      deleteDocument.isPending &&
                      deleteDocument.variables === item.id
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-line text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
                  >
                    {deleteDocument.isPending &&
                    deleteDocument.variables === item.id ? (
                      <Spinner size={12} />
                    ) : (
                      a.common.delete
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm border border-line disabled:opacity-50"
              >
                ← {a.common.back}
              </button>
              <span className="text-sm text-ink-soft">
                {interpolate(a.common.pageOf, { page: data.page, total: data.totalPages })}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="px-4 py-2 rounded-lg text-sm border border-line disabled:opacity-50"
              >
                {a.common.next} →
              </button>
            </div>
          )}
        </>
      )}

      <DocumentsCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <DocumentsEditModal
        documentId={editingId}
        onClose={() => setEditingId(null)}
      />
    </div>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
