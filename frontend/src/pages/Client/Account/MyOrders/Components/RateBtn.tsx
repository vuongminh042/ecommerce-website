import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider } from 'antd';

type RateBtnProps = {
    handleRate: (productId: string, orderId: string) => void;
    productId: string;
    orderId: string;
};

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());

const RateBtn = ({ handleRate, productId, orderId }: RateBtnProps) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: `linear-gradient(90deg,  ${colorsArr.join(', ')})`,
                        colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colorsArr).join(', ')})`,
                        colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colorsArr).join(', ')})`,
                        lineWidth: 0,
                    },
                },
            }}
        >
            <Button type='primary' size='middle' onClick={() => handleRate(productId, orderId)}>
                Đánh giá
            </Button>
        </ConfigProvider>
    );
};

export default RateBtn;
