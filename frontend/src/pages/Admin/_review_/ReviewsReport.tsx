import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import useTable from '~/hooks/_common/useTable';
import useDeleteReport from '~/hooks/review/Mutations/useDeleteReport';
import useGetAllReportReviews from '~/hooks/review/Queries/useGetAllReportReviews';
import { IReportReviewResponse } from '~/types/Review';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import dayjs from 'dayjs';
import moment from 'moment';
import { get } from 'lodash';

const ReviewReportList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps, getSortedInfo } =
        useTable<IReportReviewResponse>();
    const { data: reportReviewsRes } = useGetAllReportReviews(query);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const reportReviewsList = reportReviewsRes?.data.reportList;
    const totalDocs = reportReviewsRes?.data.totalDocs;
    const currentPage = Number(query.page || 1);
    const [reportId, setReportId] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const { mutate: deleteReport, isSuccess } = useDeleteReport(reportId);

    const showModal = (id: string) => {
        setIsModalOpen(true);
        setReportId(id);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setReportId('');
        setConfirmLoading(false);
    };
    const handleDeleteProduct = async () => {
        setConfirmLoading(true);
        deleteReport();
    };

    const columns: TableProps<IReportReviewResponse>['columns'] = [
        {
            title: 'Mã Đánh giá',
            dataIndex: 'reviewId',
            key: 'rawsearch',
            ...getColumnSearchProps('reviewId'),
            width: '15%',
            render: (_, record) => (
                <>
                    <span>{record.reviewId}</span>
                </>
            ),
        },
        {
            title: 'Người đánh giá',
            render: (_, record) => (
                <>
                    <span>{record.userId.name}</span>
                </>
            ),
            key: 'username',
            width: '20%',
        },

        {
            title: 'Nội dung đánh giá',
            dataIndex: 'content',
            key: 'content',
            render: (_, record) => (
                <>
                    <span>{record.content}</span>
                </>
            ),
        },
        {
            title: 'Lý do báo cáo',
            dataIndex: 'reason',
            key: 'reason',
            render: (_, record) => (
                <>
                    <span>{record.reason}</span>
                </>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <>
                    <span>{dayjs(record.createdAt).format('DD/MM/YYYY')}</span>
                </>
            ),
            sortOrder: getSortedInfo('createdAt'),
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space className='flex items-center justify-center' size={'middle'}>
                    <Tooltip title='Xóa đánh giá'>
                        <DeleteOutlined
                            onClick={() => showModal(record._id)}
                            className='cursor-pointer rounded-full bg-rose-200 p-2 text-rose-500 transition-colors duration-500 hover:bg-rose-300'
                            style={{ fontSize: '1rem' }}
                        />
                    </Tooltip>
                </Space>
            ),
            width: '10%',
        },
    ];
    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            setConfirmLoading(false);
        }
    }, [isSuccess]);
    return (
        <>
            <WrapperPageAdmin title='Quản lý báo cáo đánh giá' option={<span></span>}>
                <TableDisplay<IReportReviewResponse>
                    onFilter={onFilter}
                    columns={columns}
                    currentPage={currentPage}
                    dataSource={reportReviewsList}
                    onSelectPaginateChange={onSelectPaginateChange}
                    totalDocs={totalDocs}
                />
            </WrapperPageAdmin>

            {/* Modal */}
            <Modal
                title={
                    <div>
                        <WarningOutlined className='text-yellow-500' style={{ fontSize: '1.5rem' }} />
                        <h4 className='ml-2 inline-block'>Xác nhận lại</h4>
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' type='default' onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        key='button'
                        danger
                        loading={confirmLoading}
                        type='primary'
                        onClick={() => {
                            handleDeleteProduct();
                        }}
                    >
                        Chấp nhận
                    </Button>,
                ]}
            >
                <p>Bạn có muốn xóa báo cáo này không?</p>
            </Modal>
        </>
    );
};

export default ReviewReportList;
