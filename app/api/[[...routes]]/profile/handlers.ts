import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/rpc/auth';
import { Session } from 'lucia';

export const getProfile = async ({
    prisma,
    session,
}: { session: Session | null } & WithPrisma) => {
    if (!session) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(session.id);

    if (!user) {
        throw new Error('Invalid User Session');
    }

    const profile = await prisma.profile.findFirst({
        where: {
            user: {
                uuid: user.uuid,
            },
        },
        include: {
            user: true,
        },
    });

    if (!profile) {
        throw new Error('Invalid Data');
    }

    return {
        message: 'Success',
        profile,
    };
};
