import { fetchApi } from '@/lib/apis/core';

export interface SigninResponse {
    accessToken: string;
    user: {
        id: number;
        nickname: string;
        role: string;
    };
}

export async function signin(email: string, password: string) {
    return fetchApi<SigninResponse>('/auth/sign-in', {
        method: 'POST',
        body: {
            email,
            password,
        } as any,
    });
}
