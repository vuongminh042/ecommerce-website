import { MAIN_ROUTES } from '@/constants/router';
import useFilter from '@/hooks/_common/useFilter';
import useMutationAddWishList from '@/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '@/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '@/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '@/store/store';
import { IProduct } from '@/types/ProductNew';
import { Currency } from '@/utils/FormatCurreny';
import showMessage from '@/utils/ShowMessage';
import { HeartFilled } from '@ant-design/icons';
import { Rate, Spin } from 'antd';
import { debounce } from 'lodash';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DrawerAddCart from '../DrawerAddCart';
interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
function ProductCard({ item }: { item: IProduct }) {
    const navigate = useNavigate();
    const { mutate: addWishlist, isPending } = useMutationAddWishList();
    const { query } = useFilter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data?.wishList?.map((item) => item._id);
    const { handleRemoveWishList, isPending: pendingRemove } =
        useMutationRemoveWishList();
    const debouncedRemove = debounce(
        (id: string) => handleRemoveWishList(id),
        500,
    );
    const handleAddWishlist = () => {
        if (user) {
            if (wishListIds?.includes(item._id as string)) {
                debouncedRemove(item._id);
            }
            addWishlist({ productId: item._id as string });
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage(
                'Bạn cần đăng nhập trước khi thêm vào yêu thích',
                'warning',
            );
        }
    };
    const originalPrice = item.discount
        ? item.price / (1 - item.discount / 100)
        : item.price;
    return (
        <div className="group cursor-pointer">
            <div className="w-full relative h-[300px]">
                <Link to={`/products/${item?._id}`} className="h-[300px]">
                    <img
                        className="object-cover w-full h-full"
                        src={item.variants?.[0]?.image}
                        alt=""
                    />
                </Link>
                <div className="opacity-0 px-2 py-1 group-hover:opacity-100 flex items-center w-full justify-between duration-300 absolute bottom-0">
                    <DrawerAddCart
                        item={item}
                        classNameBtn="text-global hover:bg-hover px-2 duration-300 hover:text-white bg-white shadow-md flex justify-center w-full h-[32px] flex items-center justify-center rounded-md lg:text-sm font-medium"
                    >
                        <span className="text-xs xl:text-sm py-2">
                            {' '}
                            Thêm vào giỏ hàng
                        </span>
                    </DrawerAddCart>
                    <button
                        onClick={() => handleAddWishlist()}
                        className="w-1/6 h-[32px] bg-global hover:bg-opacity-80 duration-300 rounded-lg text-white"
                    >
                        {isPending || pendingRemove ? (
                            <Spin />
                        ) : wishListIds?.includes(item._id) ? (
                            <HeartFilled className="text-red-500" />
                        ) : (
                            <HeartFilled />
                        )}
                    </button>
                </div>
            </div>
            <Link to={`/products/${item?._id}`} className="text-global text-sm">
                <h3 className=" font-semibold group-hover:text-hover mt-4 w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.name}
                </h3>
                {/* <div className="flex items-center ">
                    <Rate allowHalf value={5} disabled className="text-xs" />{' '}
                    {!item?._id && (
                        <span className="text-xs text-global">( 5 )</span>
                    )}
                </div> */}
                <div className="flex gap-2 items-center">
                    <p className="font-semibold">{Currency(item?.price)}</p>
                    {item.discount !== 0 && (
                        <div className="flex gap-2 items-center">
                            <span className="line-through">
                                {Currency(originalPrice)}
                            </span>
                            <span className="text-hover font-semibold">
                                {item.discount}%
                            </span>
                        </div>
                    )}
                </div>
                {item.discount !== 0 ? (
                    <div>
                        <div className="mt-2">
                            <span className="text-hover text-xs px-2  border-[1px] rounded-sm py-0.5">
                                Giá độc quyền Online
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className=" flex justify-end flex-col">
                        <div className="mt-2">
                            <span className="text-hover text-xs px-2  border-[1px] rounded-sm py-0.5">
                                Hàng chính Hãng
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}

export default memo(ProductCard);
