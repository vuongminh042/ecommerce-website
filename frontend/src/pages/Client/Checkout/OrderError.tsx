import { Button, Result, Watermark } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function OrderError() {
    const navigate = useNavigate();
    return (
        <Watermark content={['ADSTORE', 'Oops :(!']}>
            <div className="h-[100vh]" />
            <Result
                status="error"
                title="Thanh toán thất bại!"
                subTitle="Liên hệ với chúng tôi để được hỗ trợ."
                className="fixed left-[50%] top-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent bg-gray-3 bg-opacity-65 p-10"
                extra={[
                    <Button
                        key="my-order"
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        Trang chủ
                    </Button>,
                ]}
            />
        </Watermark>
    );
}
