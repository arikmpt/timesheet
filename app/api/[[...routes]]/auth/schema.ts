import { t } from 'elysia';

export const authSchema = {
    login: t.Object({
        password: t.String({
            minLength: 3,
            maxLength: 20,
        }),
        email: t.String({
            minLength: 5,
            format: 'email',
        }),
    }),
};
