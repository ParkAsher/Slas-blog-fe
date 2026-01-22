'use client';

import { useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { trackPageView } from '@/lib/apis/metrics/track.api';
import { userAtom } from '@/lib/atoms/auth';
import { getOrCreateVisitorId } from '@/lib/utils/visitor-id';

const TRACK_EXCLUDE_PATHS = ['/signin', '/signup'];

/**
 * pathname 변경 시 POST /metrics/track 1회 호출.
 * 회원가입/로그인(/signin, /signup)은 제외.
 * 실패해도 페이지 동작은 멈추지 않고 console.error만 출력.
 */
export function PageViewTracker() {
    const pathname = usePathname();
    const user = useAtomValue(userAtom);

    useEffect(() => {
        if (TRACK_EXCLUDE_PATHS.includes(pathname)) return;
        const visitorId = getOrCreateVisitorId(user?.id ?? null);
        trackPageView(visitorId).catch((e) =>
            console.error('[metrics] track failed', e),
        );
    }, [pathname]);

    return null;
}
