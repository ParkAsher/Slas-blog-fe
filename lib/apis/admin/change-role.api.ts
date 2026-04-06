import { fetchApi } from '../core';
import type { User } from './get-users.api';

export interface ChangeRoleRequest {
  role: 'ADMIN' | 'USER';
}

export async function changeRole(
  userId: string,
  { role }: ChangeRoleRequest,
  token: string
): Promise<User> {
  return fetchApi<User>(
    `/admin/users/${userId}/role`,
    {
      method: 'PATCH',
      body: { role } as any,
    },
    token
  );
}
