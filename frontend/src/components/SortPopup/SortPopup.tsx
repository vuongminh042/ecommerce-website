import { Radio, RadioChangeEvent, Space } from 'antd';

type SortPopup = {
    value?: string;
    onChange: (e: RadioChangeEvent) => void;
};

const SortPopup = ({ value, onChange }: SortPopup) => {
    return (
        <Radio.Group
            onChange={onChange}
            value={value}
            size="large"
            className="bg-white rounded shadow px-4 py-3"
        >
            <Space direction="vertical">
                <Radio
                    value={'-createdAt'}
                    className="w-full font-medium py-1 select-none"
                >
                    Mới nhất
                </Radio>
                <Radio
                    value={'-price'}
                    className="w-full font-medium py-1 select-none"
                >
                    Giá: từ cao đến thấp
                </Radio>
                <Radio
                    value={'price'}
                    className="w-full font-medium py-1 select-none"
                >
                    Giá: từ thấp đến cao
                </Radio>
            </Space>
        </Radio.Group>
    );
};

export default SortPopup;
