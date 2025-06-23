import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { detail, list } from './handlers';
import { authMiddleware } from '../auth/middleware';
import { roleSchema } from './schema';

const roleRoutes = new Elysia({
    prefix: '/roles',
    detail: {
        tags: ['Roles'],
    },
})
    .model(roleSchema)
    .use(prismaService)
    .use(authMiddleware)
    .get(
        '/',
        async ({ prisma, session, query }) => list({ prisma, session, query }),
        {
            query: 'list',
        }
    )
    .get(
        '/:id',
        async ({ prisma, session, params: { id } }) =>
            detail({ prisma, session, id: parseInt(id) }),
        {
            params: 'detail',
        }
    );

export default roleRoutes;
