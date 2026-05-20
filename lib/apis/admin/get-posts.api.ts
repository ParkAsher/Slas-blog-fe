import { fetchApi } from '../core';

export interface Post {
  id: string;
  title: string;
  type: 'dev' | 'story';
  slug: string;
  createdAt: string;
  author: {
    id: string;
    nickname: string;
    isDeleted: boolean;
  };
  tags: string[];
  commentCount: number;
}

export interface GetPostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export async function getPosts(
  { page = 1, search = '', type = '' }: { page?: number; search?: string; type?: string } = {},
  token: string
): Promise<GetPostsResponse> {
  const params = new URLSearchParams();
  if (page > 1) params.append('page', page.toString());
  if (search) params.append('search', search);
  if (type) params.append('type', type);

  const queryString = params.toString();
  const path = queryString ? `/admin/posts?${queryString}` : '/admin/posts';

  return fetchApi<GetPostsResponse>(path, { method: 'GET' }, token);
}
