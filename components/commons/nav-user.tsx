'use client';

import { CogIcon, ChevronsUpDown, LogOut, User } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { routes } from '@/constants/routes';
import { useLogout } from '@/hooks/queries/use-logout';

export function NavUser() {
    const { isMobile } = useSidebar();
    const router = useRouter();

    const { mutate } = useLogout();

    const onLogout = () => {
        mutate();
    };

    const goToProfile = () => {
        router.push(routes.PROFILE);
    };

    const goToChangePassword = () => {
        router.push(routes.CHANGE_PASSWORD);
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size={'lg'}
                            className={
                                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            }
                        >
                            <Avatar className={'h-8 w-8 rounded-lg'}>
                                <AvatarFallback className={'rounded-lg'}>
                                    {'CN'}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={
                                    'grid flex-1 text-left text-sm leading-tight'
                                }
                            >
                                <span
                                    className={'truncate font-semibold'}
                                >{`Profile`}</span>
                                <span className={'truncate text-xs'}>
                                    {'email@email.com'}
                                </span>
                            </div>
                            <ChevronsUpDown className={'ml-auto size-4'} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={
                            'w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        }
                        side={isMobile ? 'bottom' : 'right'}
                        align={'end'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className={'p-0 font-normal'}>
                            <div
                                className={
                                    'flex items-center gap-2 px-1 py-1.5 text-left text-sm'
                                }
                            >
                                <Avatar className={'h-8 w-8 rounded-lg'}>
                                    <AvatarFallback className={'rounded-lg'}>
                                        {'CN'}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={
                                        'grid flex-1 text-left text-sm leading-tight'
                                    }
                                >
                                    <span
                                        className={'truncate font-semibold'}
                                    >{`Profile`}</span>
                                    <span className={'truncate text-xs'}>
                                        {'email@email.com'}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={goToProfile}>
                                <User />
                                {'Edit Profile'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={goToChangePassword}>
                                <CogIcon />
                                {'Change Password'}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout}>
                            <LogOut />
                            {'Log out'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
