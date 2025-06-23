import { WithPrisma } from '../db';

export const checkPermission = async ({
    prisma,
    permission,
    uuid,
}: {
    permission: string;
    uuid: string;
} & WithPrisma): Promise<boolean> => {
    const findUser = await prisma.user.findFirst({
        where: {
            uuid,
        },
        include: {
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

    if (!findUser) {
        return false;
    }

    const listPermissions: string[] =
        findUser.role?.permissions?.map((data) => data.permission.name) || [];

    return listPermissions.includes(permission);
};
