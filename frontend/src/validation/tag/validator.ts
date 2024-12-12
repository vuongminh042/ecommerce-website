import { ErrorMessage } from '../Message';

export const tagValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên thẻ!',
    },
    {
        validator(_: any, name: string) {
            if (name && name.length < 2) {
                return ErrorMessage('Tên thẻ phải lớn hơn 2 kí tự');
            }
            if (name && name.length > 30) {
                return ErrorMessage('Tên thẻ phải nhỏ hơn 30 kí tự');
            }
            return Promise.resolve();
        },
    },
];
