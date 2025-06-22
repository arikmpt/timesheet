import { lucia } from '@/app/rpc/auth';
import { cookies } from 'next/headers';

export const getSessionUser = async () => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('auth_session')?.value;
    if (!sessionId) return null;

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user) return null;

    return {
        user,
        session,
    };
};
