export const routes = {
    CHANGE_PASSWORD: '/change-password',
    LOGIN: '/auth/login',
    PROFILE: '/profile',
    EDIT_PROFILE: '/profile/edit',
    ROLE_MANAGEMENT: '/role-management',
    ROLE_DETAIL_MANAGEMENT: (id: number) => `/role-management/${id}`,
    ROOT: '/',
};
