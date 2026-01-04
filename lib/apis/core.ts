const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export interface ApiError extends Error {
    status?: number;
    data?: any;
}

async function fetchApi<T>(path: string, options: RequestInit = {}, token?: string) {
    const headers = {
        ...(options.headers || {}),
    } as Record<string, string>;

    const isJsonPayload =
        options.body &&
        typeof options.body !== 'string' &&
        !(options.body instanceof FormData) &&
        !(options.body instanceof Blob);

    if (isJsonPayload && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
        cache: 'no-store',
        credentials: 'include',
    };

    if (isJsonPayload) {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE}${path}`, config);

    if (!response.ok) {
        let errorData: any = null;
        try {
            // NestJS 기본 응답 형태를 가정: { statusCode, message, error }
            errorData = await response.json();
        } catch {
            // JSON 이 아닐 수도 있으니 무시
        }

        const apiError: ApiError = new Error(
            (errorData && (errorData.message || errorData.error)) ||
                `API 요청 실패: ${response.status}`
        );
        apiError.status = response.status;
        apiError.data = errorData;

        throw apiError;
    }

    return response.json() as Promise<T>;
}

export { fetchApi };
