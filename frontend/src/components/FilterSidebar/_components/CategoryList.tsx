import CategoryItem from '@/components/ProductAttribute/CategoryItem';
import useFilter from '@/hooks/_common/useFilter';
import { ICategory } from '@/types/Category';
import { useCallback } from 'react';

type CategoryProps = {
    categoryData: ICategory[];
};

const CategoryList = ({ categoryData }: CategoryProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback(
        (id: string) => {
            updateQueryParam({
                ...query,
                ['category']: id,
                page: 1,
            });
        },
        [query],
    );
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center  gap-2 ">
            {categoryData?.map((item) => (
                <CategoryItem
                    item={item}
                    key={item._id}
                    updateQueryParam={handleFilter}
                />
            ))}
        </div>
    );
};

export default CategoryList;
