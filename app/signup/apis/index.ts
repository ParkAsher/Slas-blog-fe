import { fetchApi } from '@/lib/api';

// 이메일 중복 체크
export async function checkEmailAvailability(email: string) {
    const query = new URLSearchParams({ email }).toString();
    const data = await fetchApi<{ exists: boolean }>(`/auth/check-email?${query}`);

    return !data.exists;
}

// 닉네임 중복 체크
export async function checkNicknameAvailability(nickname: string) {
    const query = new URLSearchParams({ nickname }).toString();
    const data = await fetchApi<{ exists: boolean }>(`/auth/check-nickname?${query}`);

    return !data.exists;
}

// 회원 가입
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
