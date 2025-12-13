import { fetchApi } from '@/lib/api';

export async function checkNicknameAvailability(nickname: string) {
    const query = new URLSearchParams({ nickname }).toString();
    const data = await fetchApi<{ exists: boolean }>(`/auth/check-nickname?${query}`);

    return !data.exists;
}
