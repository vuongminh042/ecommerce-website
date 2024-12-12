import { ADMIN_ROUTES } from '@/constants/router';
import { useMutationCreateCategory } from '@/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '@/types/Category';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { categoryValidator } from '@/validation/category/validator';

const CreateCategory = () => {
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        createCategory(values);
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WrapperPageAdmin
            title="Tạo mới danh mục"
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES} className="underline">
                    Quay lại
                </Link>
            }
        >
            <Form
                form={form}
                layout="vertical"
                className="grid grid-cols-12 "
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="col-span-8">
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item<ICategoryFormData>
                            label="Tên danh mục"
                            name="name"
                            className="font-medium text-[#08090F]"
                            rules={categoryValidator}
                        >
                            <Input placeholder="Nhập tên cho danh mục..." />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col justify-between border-s border-black border-opacity-20 px-4">
                    <div className="sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 p-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size="large"
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;
