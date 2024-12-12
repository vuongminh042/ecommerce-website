import React from 'react';
import { Card, Space, Input } from 'antd';
import {
    DollarCircleFilled,
    CreditCardFilled,
    TruckFilled,
    PercentageOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
} from '@ant-design/icons';

interface Props {
    serviceInfo: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
    };
    description: string;
}

const ServiceInfo: React.FC<Props> = ({ serviceInfo, description }) => {
    const infoCards = [
        {
            icon: <CreditCardFilled className="text-2xl text-blue-500" />,
            label: 'Phương thức thanh toán',
            value:
                serviceInfo.paymentMethod === 'cash'
                    ? 'Thanh toán khi nhận hàng'
                    : 'Thanh toán Online',
            className: 'from-blue-50 to-indigo-50',
        },

        {
            icon: <PercentageOutlined className="text-2xl text-yellow-500" />,
            label: 'Thuế',
            value: `${Number(serviceInfo.tax) * 100}% VAT`,
            className: 'from-yellow-50 to-amber-50',
        },
    ];

    return (
        <Card
            className="w-full shadow-sm rounded-2xl mt-2 border-gray-100 overflow-hidden"
            title={
                <div className="flex items-center justify-between py-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Thông tin dịch vụ
                    </h2>
                    <div className="flex items-center gap-2">
                        {serviceInfo.isPaid ? (
                            <>
                                <CheckCircleFilled className="text-lg text-green-500" />
                                <span className="text-green-600 font-medium">
                                    Đã thanh toán
                                </span>
                            </>
                        ) : (
                            <>
                                <CloseCircleFilled className="text-lg text-red-500" />
                                <span className="text-red-600 font-medium">
                                    Chưa thanh toán
                                </span>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Space direction="vertical" className="w-full" size="large">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {infoCards.map((info, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl bg-gradient-to-r ${info.className} border border-gray-100`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {info.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">
                                        {info.label}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {info.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Ghi chú đơn hàng
                    </h3>
                    <Input.TextArea
                        className="rounded-xl bg-gray-50 border-gray-200"
                        rows={3}
                        readOnly
                        value={
                            description ||
                            'Không có ghi chú nào cho đơn hàng này'
                        }
                        style={{
                            resize: 'none',
                            fontSize: '0.95rem',
                            color: description ? '#374151' : '#6B7280',
                        }}
                    />
                </div>
            </Space>
        </Card>
    );
};

export default ServiceInfo;
