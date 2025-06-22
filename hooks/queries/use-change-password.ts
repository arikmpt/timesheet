import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';
import {
    GetChangePasswordRequest,
    GetChangePasswordResponse,
} from '@/app/rpc/types';

interface Props {
    onSuccess: (data: GetChangePasswordResponse) => void;
}

export const useChangePassword = ({ onSuccess }: Props) => {
    return useMutation({
        mutationFn: async (request: GetChangePasswordRequest) => {
            const res = await api.profile['change-password'].patch(request);
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
        onSuccess,
    });
};
