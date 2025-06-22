import { AppSidebar } from '@/components/commons/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { routes } from '@/constants/routes';
import { getSessionUser } from '@/hooks/use-cookie';
import { ThemeProvider } from '@/providers/theme-provider';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSessionUser();
    if (!session) {
        redirect(routes.LOGIN);
    }

    return (
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'light'}
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar email={session.user.email} name={session.name} />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
