import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/rpc/auth';
import { GetChangePasswordRequest, GetProfileRequest } from '@/app/rpc/types';
import { Session } from 'lucia';
import bcrypt from 'bcrypt';
import config from '@/config';
import { cookies } from 'next/headers';

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

export const changePassword = async ({
    body,
    prisma,
    session,
}: {
    body: GetChangePasswordRequest;
    session: Session | null;
} & WithPrisma) => {
    if (!session) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(session.id);

    if (!user) {
        throw new Error('Invalid User Session');
    }

    const findUser = await prisma.user.findFirst({
        where: {
            uuid: user.uuid,
        },
    });

    if (!findUser) {
        throw new Error('Invalid User Data');
    }

    if (body.confirmPassword !== body.newPassword) {
        throw new Error('New password must be same with confirm password');
    }

    if (!(await bcrypt.compare(body.oldPassword, findUser.password))) {
        throw new Error('Old password not valid');
    }

    const cryptedPassword = await bcrypt.hash(
        body.confirmPassword,
        config.saltRound
    );

    const update = await prisma.user.update({
        where: {
            id: findUser.id,
        },
        data: {
            password: cryptedPassword,
        },
    });

    if (!update) {
        throw new Error(`Failed to process your request`);
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    const cookieStore = await cookies();
    cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return {
        message: 'Successfully change password',
    };
};
