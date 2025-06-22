import { CircleGauge, LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { routes } from '@/constants/routes';

export interface Menu {
    icon?: LucideIcon;
    items?: MenuItem[];
    title: string;
    url: string;
}

interface MenuItem {
    title: string;
    url: string;
}

export default function useMenu() {
    const menus: Menu[] = useMemo(
        () => [
            {
                icon: CircleGauge,
                title: 'Dashboard',
                url: routes.ROOT,
            },
        ],
        []
    );

    return menus;
}
