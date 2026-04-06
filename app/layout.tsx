import type { Metadata } from 'next';
import './globals.css';

import Providers from '@/config/providers';
import { ConditionalSiteHeader } from '@/components/conditional-site-header';
import { ConditionalMainWrapper } from '@/components/conditional-main-wrapper';
import { PageViewTracker } from '@/components/tracking/page-view-tracker';
import { defaultMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body
                className='min-h-screen bg-background text-foreground antialiased'
                suppressHydrationWarning
            >
                <Providers>
                    <PageViewTracker />
                    <ConditionalSiteHeader />
                    <ConditionalMainWrapper>{children}</ConditionalMainWrapper>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
