import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/rpc/auth';
import { Session } from 'lucia';

export const login = async ({
    body,
    prisma,
}: {
    body: { email: string; password: string };
} & WithPrisma) => {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
        where: {
            email,
        },
        include: {
            profile: true,
            role: {
                include: {
                    permissions: {
                        include: {
                            permission: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!existingUser) {
        throw new Error('Incorrect email');
    }

    if (!existingUser.isActive) {
        throw new Error('User is disabled, please contact our administrator');
    }

    if (await bcrypt.compare(password, existingUser.password)) {
        await prisma.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                lastLogin: new Date(),
            },
        });

        const session = await lucia.createSession(existingUser.uuid, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        const cookieStore = await cookies();
        cookieStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        cookieStore.set(
            'user_name',
            `${existingUser.profile?.firstName} ${existingUser.profile?.lastName}`,
            sessionCookie.attributes
        );

        return {
            message: 'Login success',
        };
    }

    throw new Error('Incorrect username or password');
};

export const logout = async ({ session }: { session: Session | null }) => {
    if (!session) {
        return {
            error: 'Unauthorized',
        };
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
        message: 'Logout success',
    };
};
