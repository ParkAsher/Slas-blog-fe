import { fetchApi } from '../core';

export interface User {
  id: string;
  email: string;
  nickname: string;
  role: 'ADMIN' | 'USER';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  users: User[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export async function getUsers(
  { page = 1, search = '' }: { page?: number; search?: string } = {},
  token: string
): Promise<GetUsersResponse> {
  const params = new URLSearchParams();
  if (page > 1) params.append('page', page.toString());
  if (search) params.append('search', search);

  const queryString = params.toString();
  const path = queryString ? `/admin/users?${queryString}` : '/admin/users';

  return fetchApi<GetUsersResponse>(path, { method: 'GET' }, token);
}
