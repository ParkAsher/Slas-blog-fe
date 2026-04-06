import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface AdminUser {
  id: string | number;
  nickname: string;
  role: string;
}

// 관리자용 sessionStorage 커스텀 storage
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

// 관리자 토큰 atom (sessionStorage에 저장)
export const adminTokenAtom = atomWithStorage<string | null>(
  'adm_token',
  null,
  createSessionStorage<string | null>(),
  { getOnInit: true }
);

// 관리자 유저 정보 atom (sessionStorage에 저장)
export const adminUserAtom = atomWithStorage<AdminUser | null>(
  'adm_user',
  null,
  createSessionStorage<AdminUser | null>(),
  { getOnInit: true }
);

// 파생 atom: 관리자 인증 여부 (읽기 전용)
export const isAdminAuthAtom = atom((get) => {
  const token = get(adminTokenAtom);
  const user = get(adminUserAtom);
  return token !== null && user?.role === 'ADMIN';
});

// write-only atom: 관리자 로그아웃 (sessionStorage도 자동 클리어)
export const adminLogoutAtom = atom(null, (_get, set) => {
  set(adminTokenAtom, null);
  set(adminUserAtom, null);
});
