import { Metadata } from 'next';
import LoginPage from '@/pages/LoginPage';

export const metadata: Metadata = {
    description: 'Timesheet login page',
    title: 'Login',
};

export default function Login() {
    return <LoginPage />;
}
