import { fetchApi } from '@/lib/apis/core';

export interface UploadImageResponse {
    path: string;
}

export async function uploadImage(file: File, token?: string): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('image', file);

    return await fetchApi<UploadImageResponse>(
        '/image/upload',
        {
            method: 'POST',
            body: formData,
        },
        token
    );
}
