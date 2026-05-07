import { useState } from 'react';
import { useDeleteUser, useUpdateUserRole, useUsersList } from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../api/client';
import { Spinner } from '../ui/Spinner';
import { Select } from '../ui/Select';
import { UserCreateModal } from './UserCreateModal';
import type { ManagedUser, UserRole } from '../types/users';
import { useI18n, interpolate } from '../i18n/I18nContext';

export function UsersListPage() {
  const { user: currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const limit = 20;
  const { t } = useI18n();
  const a = t.admin;

  const { data, isLoading, isError, error } = useUsersList({ page, limit });
  const deleteUser = useDeleteUser();
  const updateRole = useUpdateUserRole();

  const handleDelete = (u: ManagedUser) => {
    if (!confirm(interpolate(a.users.confirmDelete, { name: `${u.firstName} ${u.lastName}` }))) return;
    deleteUser.mutate(u.id);
  };

  const handleRoleChange = (u: ManagedUser, role: UserRole) => {
    if (role === u.role) return;
    updateRole.mutate({ id: u.id, input: { role } });
  };

  return (
    <div className="px-8 py-10 max-w-[1100px]">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">{a.users.title}</h1>
          <p className="text-sm text-ink-soft mt-1">
            {data ? interpolate(a.common.totalUsers, { n: data.total }) : ' '}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-deep transition-colors whitespace-nowrap"
        >
          {a.users.newButton}
        </button>
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
          {a.users.empty}
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <ul className="divide-y divide-line border border-line rounded-xl overflow-hidden">
            {data.items.map((u) => {
              const isSelf = u.id === currentUser?.id;
              const rolePending =
                updateRole.isPending && updateRole.variables?.id === u.id;
              const deletePending = deleteUser.isPending && deleteUser.variables === u.id;

              return (
                <li
                  key={u.id}
                  className="flex items-center gap-4 p-3 bg-bg hover:bg-surface transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center font-medium text-sm shrink-0">
                    {(u.firstName[0] ?? '').toUpperCase()}
                    {(u.lastName[0] ?? '').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {u.firstName} {u.lastName}
                      {isSelf && (
                        <span className="ml-2 text-xs text-ink-soft">{a.users.youSuffix}</span>
                      )}
                    </div>
                    <div className="text-xs text-ink-soft mt-0.5 truncate">{u.email}</div>
                  </div>
                  <div className="w-44 shrink-0">
                    <Select
                      value={u.role}
                      onValueChange={(v) => handleRoleChange(u, v as UserRole)}
                      options={[
                        { value: 'regular', label: a.users.roleRegular },
                        { value: 'admin',   label: a.users.roleAdmin },
                      ]}
                      ariaLabel={a.users.roleAriaLabel}
                      disabled={rolePending}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(u)}
                    disabled={isSelf || deletePending}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-line text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    {deletePending ? <Spinner size={12} /> : a.common.delete}
                  </button>
                </li>
              );
            })}
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

      <UserCreateModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
