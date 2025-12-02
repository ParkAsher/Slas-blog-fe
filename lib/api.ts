const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

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

    if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);

    return response.json() as Promise<T>;
}

export { fetchApi };
