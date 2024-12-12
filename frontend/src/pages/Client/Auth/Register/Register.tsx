import SignImg from '@/assets/SignImage.jpg';
import useDocumentTitle from '@/hooks/_common/useDocumentTitle';
import { useAuthRegister } from '@/hooks/Auth/Mutation/useAuthRegister';
import { RegisterFormData, registerSchema } from '@/validation/Auth/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
    useDocumentTitle('ADSTORE - Đăng ký');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const { mutate, isPending } = useAuthRegister();
    const onSubmit = (data: RegisterFormData) => {
        console.log(data)
        mutate(data);
    };
    return (
        <div className="relative flex justify-around max-w-screen-default default:mx-auto mx-12 mt-12">
            <img
                src={SignImg}
                alt="Sign Image"
                className="default:w-[60%] w-[650px]"
            />
            <div className="flex flex-col gap-10 items-center  justify-center">
                <h1 className="text-4xl font-medium  font-inter">Đăng ký</h1>
                <p>Chào mừng bạn đến với ADStore</p>
                <Form
                    onFinish={handleSubmit(onSubmit)}
                    className="flex flex-col w-full"
                    layout="vertical"
                >
                    <Form.Item
                        label="Tên người dùng"
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="h-[48px]"
                                    placeholder="Nhập tên người dùng"
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        validateStatus={errors.phone ? 'error' : ''}
                        help={errors.phone?.message}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="h-[48px]"
                                    placeholder="Nhập số điện thoại"
                                />
                            )}
                        />
                    </Form.Item>
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
                    <Form.Item
                        label="Mật khẩu"
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    className="h-[48px]"
                                    placeholder="Mật khẩu"
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu"
                        validateStatus={errors.confirmPassword ? 'error' : ''}
                        help={errors.confirmPassword?.message}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    className="h-[48px]"
                                    placeholder="Xác nhận lại mật khẩu"
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
                            'Đăng ký'
                        )}
                    </button>
                </Form>

                <div className="w-72 md:w-96">
                    <button
                        className="flex items-center justify-center gap-4 hover:text-white"
                        style={{
                            color: 'black',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            textTransform: 'none',
                            padding: '16px 0',
                            borderRadius: '4px',
                            fontWeight: '500',
                            width: '100%',
                            border: '1px solid hsla(0, 0%, 0%, 0.4)',
                        }}
                    >
                        {/* Google Icon SVG */}
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1920_3336)">
                                <path
                                    d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                                    fill="#FBBC04"
                                />
                                <path
                                    d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                                    fill="#EA4335"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1920_3336">
                                    <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Đăng ký với google</span>
                    </button>
                </div>

                <p className="text-gray-600 mx-auto">
                    Bạn đã có tài khoản?
                    <Link
                        to="/login"
                        className="ml-2 font-medium hover:underline"
                    >
                        Đăng nhập
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
};

export default Register;
