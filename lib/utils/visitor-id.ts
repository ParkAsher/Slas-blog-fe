const STORAGE_KEY = 's_vi';

/**
 * 트래킹용 visitorId 결정
 * - 로그인: userId (CUID 문자열 또는 number를 문자열로)
 * - 비로그인: localStorage에 UUID 저장 후 재사용 (최초 1회만 생성)
 *
 * @param userId userAtom?.id. CUID(string) 또는 number, null/undefined면 비로그인.
 * @returns x-visitor-id 헤더에 넣을 값. 클라이언트에서만 호출.
 */
export function getOrCreateVisitorId(
    userId: string | number | null | undefined,
): string {
    if (userId != null && userId !== '') return String(userId);

    const stored = window?.localStorage?.getItem(STORAGE_KEY) ?? null;
    if (stored) return stored;

    const uuid = crypto.randomUUID();
    window?.localStorage?.setItem(STORAGE_KEY, uuid);
    return uuid;
}
