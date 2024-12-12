/* eslint-disable no-nested-ternary */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/router';
import useGetCategories from '@/hooks/categories/Queries/useGetCategories';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useTable from '@/hooks/_common/useTable';
import { ICategory } from '@/types/Category';
import TableDisplay from '../../../components/_common/TableDisplay';

const CategoryList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } =
        useTable<ICategory>();
    const { data: categories } = useGetCategories(query);
    const categoryList = categories?.data.categories;
    const totalDocs = categories?.data.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title="Cập nhật danh mục">
                        <Link
                            to={`${ADMIN_ROUTES.CATEGORIES_EDIT}/${record._id}`}
                            className="text-blue-500"
                        >
                            <EditOutlined
                                className="rounded-full bg-blue-100 p-2"
                                style={{ fontSize: '1rem' }}
                            />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title="Quản lý danh mục"
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES_CREATE}>
                    <Button icon={<PlusOutlined />} type="primary">
                        Thêm mới danh mục
                    </Button>
                </Link>
            }
        >
            <TableDisplay<ICategory>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={categoryList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default CategoryList;
