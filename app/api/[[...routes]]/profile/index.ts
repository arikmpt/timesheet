import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { changePassword, getProfile, updateProfile } from './handlers';
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
    )
    .patch(
        '/change-password',
        async ({ body, prisma, session }) =>
            changePassword({ body, prisma, session }),
        {
            body: 'changePassword',
        }
    );

export default profileRoutes;
