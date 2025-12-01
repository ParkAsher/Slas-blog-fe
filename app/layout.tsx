import type { Metadata } from 'next';
import './globals.css';

import Providers from '@/config/providers';
import { SiteHeader } from '@/components/header/site-header';

export const metadata: Metadata = {
    title: 'Slasug.log',
    description: 'Slasug 개인 블로그',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className='min-h-screen bg-background text-foreground antialiased'>
                <Providers>
                    <SiteHeader />
                    <main className='mx-auto w-full max-w-5xl px-4 py-10'>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
