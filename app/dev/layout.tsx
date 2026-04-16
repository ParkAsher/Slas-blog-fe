import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dev',
    description: 'nnouss의 개발 이야기, 기술 경험, 프로그래밍 기록을 담은 공간입니다.',
    alternates: {
        canonical: 'https://nnouss.xyz/dev',
    },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
