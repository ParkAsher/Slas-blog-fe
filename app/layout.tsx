import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/config/providers';

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
        <html lang='en'>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
