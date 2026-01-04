'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 회원정보 타입
export interface User {
    id: number;
    nickname: string;
    role: string;
}

// sessionStorage를 사용하는 커스텀 storage
const createSessionStorage = <T>() => ({
    getItem: (key: string): T | null => {
        if (typeof window === 'undefined') return null;
        const item = sessionStorage.getItem(key);
        if (item === null) return null;
        try {
            return JSON.parse(item) as T;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: T): void => {
        if (typeof window === 'undefined') return;
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;
        sessionStorage.removeItem(key);
    },
});

// accessToken atom (sessionStorage에 저장)
export const accessTokenAtom = atomWithStorage<string | null>(
    'accessToken',
    null,
    createSessionStorage<string | null>(),
    {
        getOnInit: true, // 초기화 시 storage에서 읽어옴
    }
);

// 회원정보 atom (sessionStorage에 저장)
export const userAtom = atomWithStorage<User | null>(
    'user',
    null,
    createSessionStorage<User | null>(),
    {
        getOnInit: true,
    }
);

// 로그인 상태 확인
export const isAuthenticatedAtom = atom((get) => {
    const token = get(accessTokenAtom);
    const user = get(userAtom);
    return token !== null && user !== null;
});

// 로그아웃 함수 atom
export const logoutAtom = atom(null, (get, set) => {
    set(accessTokenAtom, null);
    set(userAtom, null);
});
