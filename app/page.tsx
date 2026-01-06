import { getPostsServer } from '@/lib/apis/main';
import { getTagsServer } from '@/lib/apis/main';
import { HomeClient } from '@/components/main/home-client';

export default async function Home() {
    // 서버에서 초기 데이터 가져오기 (SEO를 위해 SSR)
    const [initialPosts, initialTags] = await Promise.all([
        getPostsServer({ page: 1 }),
        getTagsServer(),
    ]);

    return <HomeClient initialPosts={initialPosts} initialTags={initialTags} />;
}
