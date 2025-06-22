import { Metadata } from 'next';
import DashboardPage from '@/pages/DashboardPage';

export const metadata: Metadata = {
    description: 'Timesheet dashboard page',
    title: 'Dashboard',
};

export default function Dashboard() {
    return <DashboardPage />;
}
