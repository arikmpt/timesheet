import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prismaClient } from '@prisma-service';
import { Lucia } from 'lucia';

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            uuid: attributes.uuid,
            email: attributes.email,
            name: attributes.name,
        };
    },
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
interface DatabaseUserAttributes {
    uuid: string;
    email: string;
    name: string;
}
