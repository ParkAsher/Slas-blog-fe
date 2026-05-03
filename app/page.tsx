import { IntroSection } from '@/components/main/intro-section';
import { LatestPostsSlide } from '@/components/main/latest-posts-slide';

export default function Home() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='flex flex-col gap-6'>
            <IntroSection />

            {/* DEV / STORY 최신 게시글 슬라이드 */}
            <LatestPostsSlide type='dev' />
            <LatestPostsSlide type='story' />

            <footer className='mt-4 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground'>
                <p>Copyright © {currentYear} NNOUSS.LOG. All rights reserved.</p>
            </footer>
        </div>
    );
}
