import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/rpc/auth';
import { GetProfileRequest } from '@/app/rpc/types';
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
            user: {
                select: {
                    email: true,
                },
            },
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

export const updateProfile = async ({
    body,
    prisma,
    session,
}: { body: GetProfileRequest; session: Session | null } & WithPrisma) => {
    if (!session) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(session.id);

    if (!user) {
        throw new Error('Invalid User Session');
    }

    const profileSession = await prisma.profile.findFirst({
        where: {
            user: {
                uuid: user.uuid,
            },
        },
        select: {
            id: true,
        },
    });

    if (!profileSession) {
        throw new Error('Invalid Data');
    }

    const profile = await prisma.profile.update({
        where: {
            userId: profileSession.id,
        },
        data: {
            ...body,
            birthOfDate: body.birthOfDate ? new Date(body.birthOfDate) : null,
        },
        include: {
            user: true,
        },
    });

    if (!profile) {
        throw new Error('Invalid Update Profile');
    }

    return {
        message: 'Successfully update profile',
        profile,
    };
};
