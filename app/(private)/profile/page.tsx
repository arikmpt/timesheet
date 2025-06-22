import { Metadata } from 'next';
import ProfilePage from '@/pages/ProfilePage';

export const metadata: Metadata = {
    description: 'Timesheet profile page',
    title: 'Profile',
};

export default function Profile() {
    return <ProfilePage />;
}
