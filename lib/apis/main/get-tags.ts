import { fetchApi } from '@/lib/api';

export interface Tag {
    name: string;
    _count: {
        posts: number;
    };
}

export async function getTags(): Promise<Tag[]> {
    return fetchApi<Tag[]>('/tag', {
        method: 'GET',
    });
}
