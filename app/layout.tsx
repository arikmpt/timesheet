import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/providers/query-provider';

const robotoSans = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto-sains',
});

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang={'en'} suppressHydrationWarning>
            <body
                className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
            >
                <QueryProvider>
                    {children}
                    <Toaster
                        toastOptions={{
                            classNames: {
                                description: '!text-white',
                                error: '!bg-destructive !text-white !border-0',
                                success: '!bg-green-600 !text-white !border-0',
                            },
                            unstyled: false,
                        }}
                    />
                </QueryProvider>
            </body>
        </html>
    );
}
