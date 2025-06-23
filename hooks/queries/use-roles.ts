import { useQuery } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';
import { GetRoleListQueryParams } from '@/app/rpc/types';

export const useRoles = (request: GetRoleListQueryParams) => {
    return useQuery({
        queryKey: ['roles', request],
        queryFn: async () =>
            await api.roles
                .get({
                    query: request,
                })
                .then((data) => data.data ?? null),
        enabled: true,
    });
};
