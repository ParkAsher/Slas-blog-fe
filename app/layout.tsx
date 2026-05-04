import type { Metadata } from 'next';
import './globals.css';

import Providers from '@/config/providers';
import { ConditionalSiteHeader } from '@/components/conditional-site-header';
import { ConditionalMainWrapper } from '@/components/conditional-main-wrapper';
import { defaultMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSON-LD Organization 스키마
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NNOUSS.LOG",
        "url": "https://nnouss.xyz",
        "logo": "https://nnouss.xyz/favicon-32x32.png",
        "description": "nnouss의 개인 블로그입니다. 개발, 일상, 그리고 다양한 주제의 글을 공유합니다.",
        "sameAs": [
            "https://github.com/nnouss"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "slasugofficial@gmail.com"
        }
    };

    // JSON-LD WebSite 스키마
    const webSiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NNOUSS.LOG",
        "url": "https://nnouss.xyz",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nnouss.xyz/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <html lang='ko' suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
                <link
                    rel="preload"
                    as="style"
                    href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css"
                />
                <link rel="preconnect" href="https://kr.object.ncloudstorage.com" crossOrigin="" />
            </head>
            <body
                className='min-h-screen bg-background text-foreground antialiased'
                suppressHydrationWarning
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
                />
                <Providers>
                    <a
                        href='#main-content'
                        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[4px] focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:ring-2 focus:ring-ring focus:outline-none'
                    >
                        메인 콘텐츠로 이동
                    </a>
                    <ConditionalSiteHeader />
                    <ConditionalMainWrapper>{children}</ConditionalMainWrapper>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
