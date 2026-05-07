import type { UserRole } from './auth';

export type { UserRole };

export interface ManagedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedUsers {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  items: ManagedUser[];
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRoleInput {
  role: UserRole;
}
