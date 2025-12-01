'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import ThemeProvider from '@/components/providers/theme-provider';

const queryClient = new QueryClient();

export default function Providers({ children }: React.PropsWithChildren) {
    return (
        <JotaiProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>{children}</ThemeProvider>
            </QueryClientProvider>
        </JotaiProvider>
    );
}
