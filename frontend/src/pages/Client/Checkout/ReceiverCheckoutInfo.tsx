import React from 'react';
import { Card, Descriptions, Divider, Typography, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined, EnvironmentOutlined, InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { RootState } from '@/store/store';

const { Title, Text } = Typography;

const ReceiverCheckoutInfo: React.FC = () => {
    const { receiverInfo, shippingAddress, shippingFee, tax, description } = useSelector(
        (state: RootState) => state.order
    );

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    return (
        <Card className='w-full shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <Title level={3} className='mb-6 text-xl sm:text-2xl'>
                Thông tin đơn hàng
            </Title>

            <Descriptions
                title={
                    <Title level={5}>
                        <UserOutlined className='mr-2' />
                        Thông tin khách hàng
                    </Title>
                }
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label='Tên khách hàng'>{receiverInfo.customer.name}</Descriptions.Item>
                <Descriptions.Item label='Số điện thoại'>{receiverInfo.customer.phone}</Descriptions.Item>
                <Descriptions.Item label='Email'>{receiverInfo.customer.email}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {receiverInfo.addReceiver.name && (
                <>
                    <Descriptions
                        title={
                            <Title level={5}>
                                <UserOutlined className='mr-2' />
                                Thông tin người nhận mới
                            </Title>
                        }
                        bordered
                        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label='Tên người nhận'>{receiverInfo.addReceiver.name}</Descriptions.Item>
                        <Descriptions.Item label='Số điện thoại'>{receiverInfo.addReceiver.phone}</Descriptions.Item>
                        <Descriptions.Item label='Email'>{receiverInfo.addReceiver.email}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </>
            )}

            <Descriptions
                title={
                    <Title level={5}>
                        <EnvironmentOutlined className='mr-2' />
                        Địa chỉ giao hàng
                    </Title>
                }
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label='Tỉnh/Thành phố'>{shippingAddress.province}</Descriptions.Item>
                <Descriptions.Item label='Quận/Huyện'>{shippingAddress.district}</Descriptions.Item>
                <Descriptions.Item label='Phường/Xã'>{shippingAddress.ward}</Descriptions.Item>
                <Descriptions.Item label='Địa chỉ'>{shippingAddress.address}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
                title={
                    <Title level={5}>
                        <InfoCircleOutlined className='mr-2' />
                        Thông tin dịch vụ
                    </Title>
                }
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label='Cước phí vận chuyển'>
                    <Tag color='blue'>
                        <DollarOutlined /> {formatCurrency(shippingFee)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label='Thuế VAT'>
                    <Tag color='green'>{tax * 100}%</Tag>
                </Descriptions.Item>
                <Descriptions.Item label='Ghi chú từ khách hàng'>
                    {description || <Text type='secondary'>Không có ghi chú</Text>}
                </Descriptions.Item>
                <Descriptions.Item label='Thời gian giao hàng dự kiến'>
                    <Tag color='orange'>3-5 ngày từ khi admin xác nhận đơn hàng</Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ReceiverCheckoutInfo;
