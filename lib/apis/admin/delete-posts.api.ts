import { fetchApi } from '../core';

export interface DeletePostsRequest {
  postIds: string[];
}

export interface DeletePostsResponse {
  deletedCount: number;
}

export async function deletePosts(
  { postIds }: DeletePostsRequest,
  token: string
): Promise<DeletePostsResponse> {
  return fetchApi<DeletePostsResponse>(
    '/admin/posts',
    {
      method: 'DELETE',
      body: { postIds } as any,
    },
    token
  );
}
