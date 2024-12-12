import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeliveredOrder } from '@/hooks/orders/Mutations/useDeliveredOrder';
import { useFinishOrder } from '@/hooks/orders/Mutations/useFinishAnOrder';

interface Props {
    orderId: string;
}

const PopConfirmFinishOrder = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const finishOrder = useFinishOrder();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (!finishOrder.isPending) {
            setOpen(false);

            finishOrder.mutate(orderId, {
                onSuccess: () => {
                    toast.success('Người nhận đã xác nhận đã nhận hàng');
                    navigate(`/admin/orders/${orderId}/detail`);
                    // setOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Popconfirm
            title="Xác nhận đã giao hàng"
            description="Bạn muốn hoàn thành quá trình cho đơn hàng này?"
            open={open}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Button
                type="default"
                loading={finishOrder.isPending}
                onClick={showPopconfirm}
            >
                Hoàn thành đơn hàng
            </Button>
        </Popconfirm>
    );
};

export default PopConfirmFinishOrder;
