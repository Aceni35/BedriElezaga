import type { ListNewsParams } from '../types/news';
import type { ListStaffParams } from '../types/staff';
import type { ListDocumentsParams } from '../types/documents';
import type { ListUsersParams } from '../types/users';

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  news: {
    all: ['news'] as const,
    lists: () => [...queryKeys.news.all, 'list'] as const,
    list: (params: ListNewsParams) => [...queryKeys.news.lists(), params] as const,
    details: () => [...queryKeys.news.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.news.details(), id] as const,
  },
  staff: {
    all: ['staff'] as const,
    lists: () => [...queryKeys.staff.all, 'list'] as const,
    list: (params: ListStaffParams) => [...queryKeys.staff.lists(), params] as const,
    details: () => [...queryKeys.staff.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.staff.details(), id] as const,
  },
  documents: {
    all: ['documents'] as const,
    lists: () => [...queryKeys.documents.all, 'list'] as const,
    list: (params: ListDocumentsParams) => [...queryKeys.documents.lists(), params] as const,
    details: () => [...queryKeys.documents.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.documents.details(), id] as const,
  },
  settings: {
    all: ['settings'] as const,
  },
  rules: {
    all: ['rules'] as const,
    lists: () => [...queryKeys.rules.all, 'list'] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (params: ListUsersParams) => [...queryKeys.users.lists(), params] as const,
  },
} as const;
