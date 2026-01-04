import { fetchApi } from '@/lib/apis/core';

export async function checkNicknameAvailability(nickname: string) {
    const query = new URLSearchParams({ nickname }).toString();
    const data = await fetchApi<{ exists: boolean }>(`/auth/check-nickname?${query}`);

    return !data.exists;
}
