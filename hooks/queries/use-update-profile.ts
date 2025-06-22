import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/app/rpc/api';
import { GetProfileRequest, GetProfileResponse } from '@/app/rpc/types';

interface Props {
    onSuccess: (data: GetProfileResponse) => void;
}

export const useUpdateProfile = ({ onSuccess }: Props) => {
    return useMutation({
        mutationFn: async (request: GetProfileRequest) => {
            const res = await api.profile.patch(request);
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
