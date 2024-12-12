import { useTypedSelector } from '@/store/store';
import { IColor } from '@/types/Color';
import { memo } from 'react';

type IColorVariantItemProps = {
    updateQueryParam: (id: string) => void;
    item: IColor;
};

const ColorVariantItem = ({
    item,
    updateQueryParam,
}: IColorVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['variants.color-arr']?.split(',') || [];
    return (
        <div
            onClick={() => updateQueryParam(item._id)}
            className={`w-10 h-10 cursor-pointer relative flex justify-center items-center border-[1.5px] bg-[#f5f5f5] hover:border-[#333] transition-colors duration-700 rounded-sm ${queryValue.includes(item._id) ? `border-black` : 'border-[#eee9e9] '}`}
        >
            <div
                className={`border-[1px] p-0.5 rounded-full ${queryValue.includes(item._id) ? 'border-global' : 'border-[#d3d3d3]'}`}
            >
                <div
                    className={`w-5 h-5 rounded-full`}
                    style={{
                        backgroundColor: `${item.hex}`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default memo(ColorVariantItem);
