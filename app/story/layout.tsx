import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Story',
    description: 'nnouss의 일상과 이야기를 담은 공간입니다.',
    alternates: {
        canonical: 'https://nnouss.xyz/story',
    },
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
