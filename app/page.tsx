import { IntroSection } from '@/components/main/intro-section';
import { LatestPostsSlide } from '@/components/main/latest-posts-slide';

export default function Home() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='flex flex-col'>
            <IntroSection />

            <div className='mt-14 flex flex-col gap-12'>
                <LatestPostsSlide type='dev' />
                <LatestPostsSlide type='story' />
            </div>

            <footer className='mt-14 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground'>
                <p>Copyright © {currentYear} NNOUSS.LOG. All rights reserved.</p>
            </footer>
        </div>
    );
}
