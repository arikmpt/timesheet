import { Metadata } from 'next';
import RolePage from '@/pages/RolePage';

export const metadata: Metadata = {
    description: 'Timesheet role management page',
    title: 'Role Management',
};

export default function Role() {
    return <RolePage />;
}
