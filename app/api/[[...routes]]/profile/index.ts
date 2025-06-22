import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { getProfile, updateProfile } from './handlers';
import { authMiddleware } from '../auth/middleware';
import { profileSchema } from './schema';

const profileRoutes = new Elysia({
    prefix: '/profile',
    detail: {
        tags: ['Profile'],
    },
})
    .model(profileSchema)
    .use(prismaService)
    .use(authMiddleware)
    .get('/', async ({ prisma, session }) => getProfile({ prisma, session }))
    .patch(
        '/',
        async ({ body, prisma, session }) =>
            updateProfile({ body, prisma, session }),
        {
            body: 'update',
        }
    );

export default profileRoutes;
