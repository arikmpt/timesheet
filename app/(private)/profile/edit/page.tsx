import { Metadata } from 'next';
import EditProfilePage from '@/pages/EditProfilePage';

export const metadata: Metadata = {
    description: 'Timesheet edit profile page',
    title: 'Edit Profile',
};

export default function EditProfile() {
    return <EditProfilePage />;
}
