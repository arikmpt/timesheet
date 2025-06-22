import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { login, logout } from './handlers';
import { authMiddleware } from './middleware';
import { authSchema } from './schema';

const authRoutes = new Elysia({
    prefix: '/auth',
    detail: {
        tags: ['Auth'],
    },
})
    .model(authSchema)
    .use(prismaService)
    .use(authMiddleware)
    .post('/login', async ({ body, prisma }) => login({ body, prisma }), {
        body: 'login',
    })
    .get('/logout', async ({ session }) => logout({ session }));

export default authRoutes;
