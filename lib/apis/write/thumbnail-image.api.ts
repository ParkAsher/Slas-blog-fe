import { fetchApi } from '@/lib/apis/core';

export interface UploadThumbnailResponse {
    path: string;
}

export async function uploadThumbnailImage(
    file: File,
    token?: string
): Promise<UploadThumbnailResponse> {
    const formData = new FormData();
    formData.append('thumbnail', file);

    return await fetchApi<UploadThumbnailResponse>(
        '/image/thumbnail/upload',
        {
            method: 'POST',
            body: formData,
        },
        token
    );
}
