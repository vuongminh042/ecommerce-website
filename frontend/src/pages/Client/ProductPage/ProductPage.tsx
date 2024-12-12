import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import ProductCard from '@/components/ProductCard/ProductCard';
import SortPopup from '@/components/SortPopup/SortPopup';
import useFilter from '@/hooks/_common/useFilter';
import useGetProducts from '@/hooks/Products/useGetProducts';
import { DownOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Dropdown,
    Empty,
    Pagination,
    RadioChangeEvent,
    Skeleton,
} from 'antd';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const limit = 10;
    const { query, updateQueryParam, reset } = useFilter();
    const queryKeys = Object.keys(query);
    let isResetFilter = false;
    const { data: productResponse, isLoading: isProductLoading } =
        useGetProducts(query);
    const products = productResponse?.data.products;
    const totalProducts = products?.length;
    const totalDocs = productResponse?.data?.totalDocs;
    // const totalPages = Math.ceil(totalDocs / Number(query?.limit)) || 0;

    // check if query key is have one
    if (
        (queryKeys.length === 1 && queryKeys.includes('category')) ||
        (queryKeys.length === 2 &&
            queryKeys.includes('category') &&
            queryKeys.includes('page'))
    ) {
        isResetFilter = false;
    } else if (queryKeys.length > 0) {
        isResetFilter = true;
    }

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['sort']: e.target.value });
    };

    const handleReset = () => {
        reset();
    };

    const onPageChange = (page: number) => {
        updateQueryParam({
            ...query,
            page: page.toString(),
            limit: String(limit),
        });
    };

    return (
        <div className="lg:max-w-[1200px] 2xl:max-w-screen-default w-full default:mx-auto mx-4">
            <div className="gap-4 flex">
                <div className="basis-1/4 mt-6">
                    <FilterSidebar />
                </div>
                <div className="px-2 flex-1">
                    <div className="breadcrumb">
                        <Breadcrumb
                            className="text-base py-4"
                            separator=">"
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <Link to="/">Sản phẩm</Link>,
                                },
                            ]}
                        />
                    </div>
                    <div className="flex justify-between border-b border-black border-opacity-5 pb-4">
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{totalProducts}</span>
                            <span className="font-normal">sản phẩm</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Dropdown
                                placement="bottomLeft"
                                className=""
                                trigger={['click']}
                                dropdownRender={() => (
                                    <SortPopup
                                        value={query?.sort}
                                        onChange={onChange}
                                    />
                                )}
                            >
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <UnorderedListOutlined
                                        style={{ fontSize: 20 }}
                                    />
                                    <span className="font-medium">
                                        Sắp xếp theo
                                    </span>
                                    <DownOutlined />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    {isResetFilter && (
                        <Button
                            htmlType="button"
                            type="default"
                            onClick={handleReset}
                        >
                            Đặt lại
                        </Button>
                    )}
                    <div className="my-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products?.map((item: any) => (
                                <ProductCard item={item} key={item._id} />
                            ))}
                        </div>

                        {products && products?.length === 0 && <Empty />}
                        {isProductLoading && <Skeleton />}
                        {products && products?.length > 0 && (
                            <Pagination
                                className="flex justify-center item-center my-4"
                                current={Number(query.page) || 1}
                                pageSize={limit}
                                total={totalDocs}
                                onChange={onPageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
