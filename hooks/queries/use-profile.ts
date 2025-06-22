import { useQuery } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () =>
            await api.profile.get().then((data) => data.data?.profile ?? null),
        enabled: true,
    });
};
