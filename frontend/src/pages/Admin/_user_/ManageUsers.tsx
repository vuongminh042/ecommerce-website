/* eslint-disable no-nested-ternary */
import useTable from '@/hooks/_common/useTable';
import type { TableProps } from 'antd';
import { Image } from 'antd';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { IUser } from '@/types/user';
import { ROLE } from '@/constants/enum';
import { cn } from '@/utils';
import useGetAllUsers from '@/hooks/users/Queries/useGetAllUsers';

const ManageUser = () => {
    const {
        query,
        onSelectPaginateChange,
        onFilter,
        getColumnSearchProps,
        getFilteredValue,
    } = useTable<IUser>();
    const { data } = useGetAllUsers(query);
    const users = data?.data?.users;
    console.log(users);
    const totalDocs = data?.data?.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    <Image src={avatar} width={100} height={100} />
                </div>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <h4>{text}</h4>,
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <h4>{text}</h4>,
            width: '20%',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            filteredValue: getFilteredValue('role'),
            filters: [
                { text: 'Quản trị viên', value: ROLE.ADMIN },
                { text: 'Người dùng', value: ROLE.USER },
            ],
            render: (role) => (
                <span
                    className={cn({
                        ['text-red']: role === ROLE.ADMIN,
                        ['text-green-500']: role === ROLE.USER,
                    })}
                >
                    {role === ROLE.ADMIN && 'Quản trị viên'}{' '}
                    {role === ROLE.USER && 'Người dùng'}
                </span>
            ),
        },
    ];

    return (
        <WrapperPageAdmin title="Danh sách người dùng">
            <TableDisplay<IUser>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={users}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ManageUser;
