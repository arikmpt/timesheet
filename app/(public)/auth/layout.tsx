'use client';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={
                'flex h-screen w-full flex-col items-center justify-center gap-5'
            }
        >
            <div className={'flex flex-col gap-2'}>{children}</div>
        </div>
    );
}
