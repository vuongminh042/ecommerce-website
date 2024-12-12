import useGetAllColors from '@/hooks/Colors/Queries/useGetAllColors';
import useGetAllSizes from '@/hooks/Sizes/Queries/useGetAllSizes';
import { MenuProps } from 'antd';
import ColorList from './ColorList';
import PriceRange from './PriceRange';
import SizeList from './SizeList';
// import CategoryList from './CategoryList';
// import useGetCategoriesMenu from '@/hooks/categories/Queries/useGetCategoriesMenu';

type MenuItem = Required<MenuProps>['items'][number];

export const FilterItem = () => {
    const { data: colorRes } = useGetAllColors();
    const { data: sizeRes } = useGetAllSizes();
    // const { data: categoriesRes } = useGetCategoriesMenu();

    const items: MenuItem[] = [
        // {
        //     key: 'categories',
        //     label: 'Danh mục',
        //     children: [
        //         {
        //             key: 'categories-1',
        //             type: 'group',
        //             label: (
        //                 <CategoryList
        //                     categoryData={categoriesRes?.data.categories || []}
        //                 />
        //             ),
        //         },
        //     ],
        // },
        {
            key: 'sizes',
            label: 'Kích cỡ',
            children: [
                {
                    key: 'sizes-1',
                    type: 'group',
                    label: <SizeList sizeData={sizeRes?.data.sizes || []} />,
                },
            ],
        },
        {
            key: 'colors',
            label: 'Màu sắc',
            children: [
                {
                    key: 'colors-1',
                    type: 'group',
                    label: (
                        <ColorList colorData={colorRes?.data.colors || []} />
                    ),
                },
            ],
        },
        {
            key: 'cost',
            label: 'Khoảng giá',
            children: [
                {
                    key: 'cost-1',
                    type: 'group',
                    label: <PriceRange />,
                },
            ],
        },
    ];
    return items;
};
