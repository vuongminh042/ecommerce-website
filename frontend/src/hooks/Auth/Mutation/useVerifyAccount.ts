import { QUERY_KEY } from '@/constants/queryKey';
import AuthServices from '@/services/auth.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useVerifyAccount = (token: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['VERIFY_ACCOUNT'],
        mutationFn: () => AuthServices.verify({ token }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS],
            });
        },
        onError: (error: any) => {},
    });
};
