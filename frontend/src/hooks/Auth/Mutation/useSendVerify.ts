import AuthServices from '@/services/auth.service';
import showMessage from '@/utils/ShowMessage';
import { useMutation } from '@tanstack/react-query';

export const useSendVerify = () => {
    return useMutation({
        mutationKey: ['SEND_VERIFY'],
        mutationFn: (body: { email: string }) => AuthServices.sendVerify(body),
        onSuccess: (data: any) => {
            showMessage(data.data.message, 'success');
        },
        onError: (error: any) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};
