import { useTypedSelector } from '@/store/store';
import { ISize } from '@/types/Size';
import { memo } from 'react';

type SizeVariantItemProps = {
    item: ISize;
    updateQueryParam: (id: string) => void;
};

const SizeVariantItem = ({ item, updateQueryParam }: SizeVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['variants.size-arr']?.split(',') || [];

    return (
        <button
            onClick={() => updateQueryParam(item._id)}
            className={`w-10 h-10 block text-sm text-opacity-90 transition-colors duration-700 cursor-pointer text-[#777777]  ${queryValue.includes(item._id) ? 'border-[#333333]' : 'border-[#d3d3d3] hover:border-[#333333]'} border-[1.5px] rounded-sm `}
        >
            {item.name}
        </button>
    );
};

export default memo(SizeVariantItem);
