import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { getProfile } from './handlers';
import { authMiddleware } from '../auth/middleware';

const profileRoutes = new Elysia({
    prefix: '/profile',
    detail: {
        tags: ['Auth'],
    },
})
    .use(prismaService)
    .use(authMiddleware)
    .get('/', async ({ prisma, session }) => getProfile({ prisma, session }));

export default profileRoutes;
