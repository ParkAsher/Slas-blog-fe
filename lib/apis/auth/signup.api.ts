import { fetchApi } from '@/lib/apis/core';

export async function signup(email: string, password: string, nickname: string) {
    return fetchApi<{ message?: string }>('/auth/sign-up', {
        method: 'POST',
        body: {
            email: email.trim(),
            password,
            nickname: nickname.trim(),
        } as any,
    });
}
