import { t } from 'elysia';

export const roleSchema = {
    list: t.Object({
        page: t.Optional(t.Number()),
        limit: t.Optional(t.Number()),
        search: t.Optional(t.String()),
    }),
    detail: t.Object({
        id: t.String(),
    }),
};
