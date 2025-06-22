import { Metadata } from 'next';
import ChangePasswordPage from '@/pages/ChangePasswordPage';

export const metadata: Metadata = {
    description: 'Timesheet change password page',
    title: 'Change Password',
};

export default function ChangePassword() {
    return <ChangePasswordPage />;
}
