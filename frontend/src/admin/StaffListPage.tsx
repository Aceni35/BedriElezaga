import { useState } from "react";
import { useDeleteStaff, useStaffList } from "../hooks/useStaff";
import { getApiErrorMessage } from "../api/client";
import { Spinner } from "../ui/Spinner";
import { Select } from "../ui/Select";
import { StaffCreateModal } from "./StaffCreateModal";
import { StaffEditModal } from "./StaffEditModal";
import { STAFF_CATEGORIES, type StaffCategory } from "../types/staff";
import { useI18n, interpolate } from "../i18n/I18nContext";

const ALL = "all";

export function StaffListPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<StaffCategory | typeof ALL>(ALL);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const limit = 10;
  const { t } = useI18n();
  const a = t.admin;

  const { data, isLoading, isError, error } = useStaffList({
    page,
    limit,
    category: category === ALL ? undefined : category,
  });
  const deleteStaff = useDeleteStaff();

  const handleDelete = (id: string, fullName: string) => {
    if (!confirm(interpolate(a.common.confirmDelete, { name: fullName }))) return;
    deleteStaff.mutate(id);
  };

  const categoryOptions = [
    { value: ALL, label: t.staff.allFilter },
    ...STAFF_CATEGORIES.map((c) => ({
      value: c,
      label: t.staff.categories[c] || c,
    })),
  ];

  return (
    <div className="px-8 py-10 max-w-[1100px]">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">{a.staff.title}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {data ? interpolate(a.common.totalMembers, { n: data.total }) : " "}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep transition-colors whitespace-nowrap"
        >
          {a.staff.newButton}
        </button>
      </div>

      <div className="mb-6 max-w-xs">
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v as StaffCategory | typeof ALL);
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
          {a.staff.empty}
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
                <div className="w-14 h-14 rounded-full bg-surface overflow-hidden shrink-0">
                  {item.picture?.url ? (
                    <img
                      src={item.picture.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.fullName}</div>
                  <div className="text-xs text-ink-soft mt-0.5 flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface border border-line">
                      {t.staff.categories[item.category] || item.category}
                    </span>
                    <span className="truncate">{item.position}</span>
                    <span>{interpolate(a.staff.sinceShort, { y: item.memberSince })}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingId(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-line hover:border-primary hover:text-primary transition-colors"
                  >
                    {a.common.edit}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.fullName)}
                    disabled={
                      deleteStaff.isPending && deleteStaff.variables === item.id
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-line text-red-600 hover:bg-red-50 disabled:opacity-60 transition-colors"
                  >
                    {deleteStaff.isPending &&
                    deleteStaff.variables === item.id ? (
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

      <StaffCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <StaffEditModal memberId={editingId} onClose={() => setEditingId(null)} />
    </div>
  );
}
