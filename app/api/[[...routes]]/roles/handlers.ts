import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/rpc/auth';
import { checkPermission } from '@/app/rpc/session';
import { GetRoleListQueryParams } from '@/app/rpc/types';
import { INDEX_ROLE } from '@/constants/permissions';
import { Session } from 'lucia';

export const list = async ({
    query,
    prisma,
    session,
}: {
    query: GetRoleListQueryParams;
    session: Session | null;
} & WithPrisma) => {
    if (!session) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(session.id);

    if (!user) {
        throw new Error('Invalid User Session');
    }

    const permission = await checkPermission({
        prisma,
        permission: INDEX_ROLE,
        uuid: user.uuid,
    });

    if (!permission) {
        throw new Error(`You don't have permission to access this page`);
    }

    const { page = 1, limit = 10, search } = query;

    const whereClause = search
        ? {
              name: {
                  contains: search,
              },
          }
        : {};

    const [roles, total] = await Promise.all([
        prisma.role.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: limit,
            select: {
                name: true,
                id: true,
            },
        }),
        prisma.role.count({
            where: whereClause,
        }),
    ]);

    const totalPage = Math.ceil(total / limit);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return {
        message: 'Successfully get list roles',
        roles,
        meta: {
            totalData: total,
            currentPage: page,
            hasNextPage,
            hasPrevPage,
            pages,
            totalPage,
        },
    };
};

export const detail = async ({
    id,
    prisma,
    session,
}: {
    id: number;
    session: Session | null;
} & WithPrisma) => {
    if (!session) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(session.id);

    if (!user) {
        throw new Error('Invalid User Session');
    }

    const permission = await checkPermission({
        prisma,
        permission: INDEX_ROLE,
        uuid: user.uuid,
    });

    if (!permission) {
        throw new Error(`You don't have permission to access this page`);
    }

    const role = await prisma.role.findFirst({
        where: {
            id,
        },
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
        },
    });

    if (!role) {
        throw new Error(`Data role not found`);
    }

    return {
        message: 'Successfully get list roles',
        role,
    };
};
