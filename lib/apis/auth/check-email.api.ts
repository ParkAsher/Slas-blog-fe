import { fetchApi } from '@/lib/apis/core';

export async function checkEmailAvailability(email: string) {
    const query = new URLSearchParams({ email }).toString();
    const data = await fetchApi<{ exists: boolean }>(`/auth/check-email?${query}`);

    return !data.exists;
}
