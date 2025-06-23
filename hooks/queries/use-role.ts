import { useQuery } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';

export const useRole = (id: number) => {
    return useQuery({
        queryKey: ['role', id],
        queryFn: async () => {
            const res = await api.roles({ id }).get();
            if (res.error) {
                throw new Error(res.error.value.message);
            }

            return res.data;
        },
        enabled: !!id,
        retry: false,
    });
};
