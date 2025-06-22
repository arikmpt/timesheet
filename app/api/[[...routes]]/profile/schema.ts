import { t } from 'elysia';

export const profileSchema = {
    update: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        countryCode: t.Nullable(t.String()),
        contactNumber: t.Nullable(t.String()),
        birthOfDate: t.Nullable(t.String()),
        placeOfBirth: t.Nullable(t.String()),
        address: t.Nullable(t.String()),
    }),
    changePassword: t.Object({
        oldPassword: t.String(),
        newPassword: t.String(),
        confirmPassword: t.String(),
    }),
};
