import { fetchApi } from '../core';
import type { User } from './get-users.api';

export async function deactivateUser(userId: string, token: string): Promise<User> {
  return fetchApi<User>(
    `/admin/users/${userId}`,
    {
      method: 'DELETE',
    },
    token
  );
}
