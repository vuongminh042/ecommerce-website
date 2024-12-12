import React from 'react';
import { Card, Space } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';

interface User {
    email: string;
    name: string;
    phone: string;
}

interface Props {
    customerInfo: User;
    receiverInfo: User;
    shippingAddress: {
        country: string;
        province: string;
        district: string;
        ward: string;
        address: string;
    };
}

const InfoSection: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
    icon,
    label,
    value
}) => (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <div className="p-2 bg-white rounded-lg shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-base text-gray-800 font-medium">{value || '---'}</p>
        </div>
    </div>
);

const AddressSection: React.FC<{ address: string; location: string }> = ({
    address,
    location
}) => (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-100">
        <div className="p-2 bg-white rounded-lg shadow-sm">
            <EnvironmentOutlined className="text-lg text-blue-500" />
        </div>
        <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
            <p className="text-base text-gray-800 font-medium mb-1">{address}</p>
            <p className="text-sm text-gray-600">{location}</p>
        </div>
    </div>
);

const CustomerInfo: React.FC<Props> = ({
    customerInfo,
    receiverInfo,
    shippingAddress,
}) => {
    const getFullAddress = () => {
        const parts = [
            shippingAddress?.address,
            shippingAddress?.ward,
            shippingAddress?.district,
            shippingAddress?.province,
            shippingAddress?.country
        ].filter(Boolean);
        return parts.join(', ');
    };

    return (
        <Space direction="vertical" size="large" className="w-full">
            <Card 
                title={
                    <div className="flex items-center gap-2">
                        <UserOutlined className="text-lg text-blue-500" />
                        <span className="text-lg font-semibold">Thông tin khách hàng</span>
                    </div>
                }
                className="w-full shadow-sm rounded-2xl border-gray-100"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoSection
                        icon={<UserOutlined className="text-lg text-violet-500" />}
                        label="Tên khách hàng"
                        value={customerInfo?.name}
                    />
                    <InfoSection
                        icon={<MailOutlined className="text-lg text-pink-500" />}
                        label="Email"
                        value={customerInfo?.email}
                    />
                    <InfoSection
                        icon={<PhoneOutlined className="text-lg text-green-500" />}
                        label="Số điện thoại"
                        value={customerInfo?.phone}
                    />
                </div>
            </Card>

            {receiverInfo && receiverInfo.name && (
                <Card 
                    title={
                        <div className="flex items-center gap-2">
                            <UserOutlined className="text-lg text-green-500" />
                            <span className="text-lg font-semibold">Thông tin người nhận</span>
                        </div>
                    }
                    className="w-full shadow-sm rounded-2xl border-gray-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoSection
                            icon={<UserOutlined className="text-lg text-violet-500" />}
                            label="Tên người nhận"
                            value={receiverInfo.name}
                        />
                        <InfoSection
                            icon={<MailOutlined className="text-lg text-pink-500" />}
                            label="Email"
                            value={receiverInfo.email}
                        />
                        <InfoSection
                            icon={<PhoneOutlined className="text-lg text-green-500" />}
                            label="Số điện thoại"
                            value={receiverInfo.phone}
                        />
                    </div>
                </Card>
            )}

            <Card 
                title={
                    <div className="flex items-center gap-2">
                        <HomeOutlined className="text-lg text-orange-500" />
                        <span className="text-lg font-semibold">Địa chỉ giao hàng</span>
                    </div>
                }
                className="w-full shadow-sm rounded-2xl border-gray-100"
            >
                <AddressSection
                    address={shippingAddress?.address}
                    location={getFullAddress()}
                />
            </Card>
        </Space>
    );
};

export default CustomerInfo;