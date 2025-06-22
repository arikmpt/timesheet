import { toast } from 'sonner';
import { routes } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await api.auth.logout.get();
            if (res.error) {
                throw new Error('Invalid API');
            }

            return res.data;
        },
        onError: (err) => {
            toast.error('Error', {
                description:
                    err instanceof Error ? err.message : 'Something went wrong',
                position: 'top-right',
            });
        },
        onSuccess: () => {
            window.location.href = routes.LOGIN;
        },
    });
};
