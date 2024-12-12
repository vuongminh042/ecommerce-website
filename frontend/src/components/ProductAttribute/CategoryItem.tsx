import { useTypedSelector } from '@/store/store';
import { ICategory } from '@/types/Category';
import { memo } from 'react';

type CategoryProps = {
    item: ICategory;
    updateQueryParam: (id: string) => void;
};

const SizeVariantItem = ({ item, updateQueryParam }: CategoryProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['category'];
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
