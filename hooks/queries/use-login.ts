import { toast } from 'sonner';
import { routes } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';

interface LoginRequest {
    email: string;
    password: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (user: LoginRequest) => {
            const res = await api.auth.login.post(user);
            if (res.error) {
                throw new Error(res.error.value.message);
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
            window.location.href = routes.ROOT;
        },
    });
};
