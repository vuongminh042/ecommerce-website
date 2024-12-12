import useDocumentTitle from '@/hooks/_common/useDocumentTitle';
import { useAuthLogin } from '@/hooks/Auth/Mutation/useAuthLogin';
import { LoginFormData, loginSchema } from '@/validation/Auth/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Spin } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SignImg from '@/assets/SignImage.jpg';
import useSendResetPassword from '@/hooks/Auth/Mutation/useSendResetPassword';

export default function ForgotPassword() {
    useDocumentTitle('ADSTORE - Khôi phục mật khẩu');
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        defaultValues: {
            email: '',
        },
    });
    const { mutate, isPending } = useSendResetPassword();
    const onSubmit = (data: { email: string }) => {
        mutate(data, {onError: (err: any)=> {
            const errObj = err.response.data
            if(errObj.data.field){
                setError('email', {message: errObj.data.message})
            }
        }});
    };
    return (
        <div className="relative flex justify-around max-w-screen-default default:mx-auto mx-12 mt-12">
            <img
                src={SignImg}
                alt="Sign Image"
                className="default:w-[60%] w-[650px]"
            />
            <div className="flex flex-col gap-10 items-center w-72 md:w-96  justify-center">
                <h1 className="text-4xl font-medium  font-inter">
                    Khôi phục mật khẩu
                </h1>
                <p>Chúng tôi sẽ gửi mật khẩu mới tới email của bạn</p>
                <a href="" target="_blank"></a>
                <Form
                    onFinish={handleSubmit(onSubmit)}
                    className="flex flex-col w-full"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="h-[48px]"
                                    placeholder="Địa chỉ email"
                                />
                            )}
                        />
                    </Form.Item>

                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full h-[48px] bg-global rounded-md text-white font-medium hover:bg-hover duration-300 "
                    >
                        {isPending ? (
                            <Spin className="text-hover" />
                        ) : (
                            'Khôi phục mật khẩu'
                        )}
                    </button>
                    <Link
                        to={'/login'}
                        className="text-global text-center mt-4 hover:text-hover duration-300"
                    >
                        Quay về đăng nhập
                    </Link>
                </Form>

                <p className="text-gray-600 mx-auto">
                    Bạn chưa có tài khoản?
                    <Link
                        to="/register"
                        className="ml-2 font-medium hover:underline"
                    >
                        Đăng ký
                    </Link>
                </p>
            </div>
            {/* <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={feedback.type}
        sx={{ width: '100%' }}
      >
        {feedback.message}
      </Alert>
    </Snackbar> */}
        </div>
    );
}
