import { MAIN_ROUTES } from '@/constants/router';
import useFilter from '@/hooks/_common/useFilter';
import { useMutationAddToCart } from '@/hooks/cart/Mutations/useAddCart';
import useMutationAddWishList from '@/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '@/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '@/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState, useTypedSelector } from '@/store/store';
import { IProduct } from '@/types/ProductNew';
import { Currency } from '@/utils/FormatCurreny';
import showMessage from '@/utils/ShowMessage';
import { cn } from '@/utils/TailwindMerge';
import { CloseOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, InputNumber, Rate, Space, Spin } from 'antd';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
type IPropsDrawerAddCart = {
    children: React.ReactNode;
    classNameBtn?: string;
    item: IProduct;
};
interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
export default function DrawerAddCart({
    children,
    classNameBtn,
    item,
}: IPropsDrawerAddCart) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const onClose = () => {
        setOpen(false);
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const [valueQuantity, setValueQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<{
        _id: string;
        color: any;
        stock: number;
    } | null>();
    const [selectedSize, setSelectedSize] =
        useState<TransformedVariant | null>();
    const [selectedImage, setSelectedImage] = useState<{
        index: number;
        image: string;
    }>({ index: 0, image: '' });
    const [variantsList, setVariantsList] = useState<TransformedVariant[]>();
    useEffect(() => {
        if (item) {
            setSelectedImage({
                index: 0,
                image: item?.variants[0]?.image,
            });
            const transformedVariants: TransformedVariant[] =
                item.variants.reduce((acc, variant) => {
                    let sizeIndex = acc.findIndex(
                        (item) => item?.size?._id === variant?.size?._id,
                    );
                    if (sizeIndex === -1) {
                        acc.push({
                            size: variant?.size,
                            colors: [
                                {
                                    color: variant?.color,
                                    stock: variant?.stock,
                                    image: variant?.image,
                                    _id: variant?._id,
                                },
                            ],
                        });
                    } else {
                        acc[sizeIndex].colors.push({
                            color: variant?.color,
                            stock: variant?.stock,
                            image: variant?.image,
                            _id: variant?._id,
                        });
                    }

                    return acc;
                }, [] as TransformedVariant[]);
            setVariantsList(transformedVariants);
            const defaultVariant = transformedVariants.find((variant) => {
                return variant.colors.some((color) => color.stock > 0);
            });
            if (defaultVariant) {
                const defaultColor = defaultVariant.colors.find(
                    (color) => color.stock > 0,
                );
                setSelectedSize(defaultVariant);
                setSelectedImage({
                    index: 0,
                    image: defaultColor.image,
                });
                setSelectedColor(defaultColor);
            }
        }
    }, [item]);
    const handleChooseSize = (item: any) => {
        setValueQuantity(1);
        let selectedColor = item.colors[0];
        if (selectedColor.stock === 0) {
            const availableColor = item.colors.find(
                (color: any) => color.stock > 0,
            );
            if (availableColor) {
                selectedColor = availableColor;
            } else {
                selectedColor = item.colors[1] || item.colors[0];
                alert('Tất cả các màu đều hết hàng.');
            }
        }
        setSelectedColor(selectedColor);
        setSelectedImage({
            index: 0,
            image: selectedColor.image,
        });
        setSelectedSize(item);
    };

    const handleChooseColor = (item: any) => {
        setValueQuantity(1);
        setSelectedColor({
            _id: item._id,
            color: item.color,
            stock: item.stock,
        });
        setSelectedImage({
            index: 0,
            image: item.image,
        });
    };
    const hasAvailableStock = variantsList?.some((variant) =>
        variant.colors.some((color) => color.stock > 0),
    );
    const { mutate, isPending } = useMutationAddToCart();
    const handleIncrement = () => {
        if (valueQuantity < (selectedColor?.stock ? selectedColor.stock : 0))
            setValueQuantity(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setValueQuantity(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setValueQuantity(e ? e : 1);
    };
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        if (isAuth) {
            if (selectedColor) {
                mutate(
                    {
                        productId: item._id,
                        quantity: valueQuantity,
                        variantId: selectedColor._id,
                    },
                    { onSuccess: () => onClose() },
                );
            } else {
                showMessage('Bạn chưa chọn biến thể sản phẩm!', 'warning');
            }
        } else {
            navigate('/login');
            showMessage(
                'Bạn cần đăng nhập trước khi mua hàng!',
                'warning',
                2000,
            );
        }
    };

    //wishlist
    const { mutate: addWishlist, isPending: pendingWishList } = useMutationAddWishList();
    const { query } = useFilter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data?.wishList?.map((item) => item._id);
    const { handleRemoveWishList, isPending: pendingRemoveWishList } = useMutationRemoveWishList();
    const debouncedRemove = debounce(
        (id: string) => handleRemoveWishList(id),
        500,
    );
    const handleAddWishlist = () => {
        if (user) {
            if (wishListIds?.includes(item._id as string)) {
                debouncedRemove(item._id)
            }
            addWishlist({ productId: item._id as string });
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                className={cn('cursor-pointer whitespace-nowrap', classNameBtn)}
                onClick={showDrawer}
            >
                {children}
            </button>
            <Drawer
                title={
                    <>
                        <div className="flex items-center justify-between">
                            <div className="font-bold uppercase text-global">
                                Tên sản phẩm
                            </div>
                            <Button type="text" onClick={onClose}>
                                <CloseOutlined className="transform text-xl transition duration-500 hover:rotate-180" />
                            </Button>
                        </div>
                    </>
                }
                placement="bottom"
                closable={false}
                height={'auto'}
                onClose={onClose}
                open={isOpen}
                // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                <div className="h-full flex flex-col md:flex-row gap-5 items-center">
                    <div className="w-[280px]">
                        <img src={selectedImage.image} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-5">
                            <div>
                                <h3 className="font-semibold text-lg text-global">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Rate
                                        allowHalf
                                        value={5}
                                        disabled
                                        className="text-base"
                                    />
                                    <span className="text-xs text-global">
                                        (5)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="font-semibold text-xl">
                                    {Currency(item?.price)}
                                </p>
                                {item.discount !== 0 && (
                                    <div className="flex gap-2 items-center">
                                        <span className="line-through text-xl">
                                            {Currency(
                                                item.discount
                                                    ? item.price /
                                                          (1 -
                                                              item.discount /
                                                                  100)
                                                    : item.price,
                                            )}
                                        </span>
                                        <span className="text-hover font-semibold text-xl">
                                            {item.discount}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {hasAvailableStock ? (
                            <>
                                <div className="my-2">
                                    <div>
                                        <span className="text-global">
                                            Kích cỡ
                                        </span>
                                        :{' '}
                                        <span className="text-global font-semibold">
                                            {selectedSize?.size?.name}
                                        </span>
                                    </div>

                                    <Flex className="my-2">
                                        {variantsList?.map((item, index) => {
                                            const hasStock = item?.colors?.some(
                                                (color: any) => color.stock > 0,
                                            );

                                            return (
                                                <button
                                                    key={index}
                                                    className={`relative mr-1 ${!hasStock ? 'text-[#777777] border-[#d3d3d3]' : ''} w-10 h-10 text-xs rounded-sm ${selectedSize?.size?.name === item?.size?.name ? ' bg-hover text-white font-semibold' : 'border-[1px]'}`}
                                                    onClick={() =>
                                                        handleChooseSize(item)
                                                    }
                                                    disabled={!hasStock}
                                                >
                                                    {item?.size?.name}
                                                    {!hasStock && (
                                                        <div className="absolute w-13 h-[2px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#d3d3d3] rotate-45"></div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </Flex>
                                </div>

                                <div className="my-2">
                                    <div>
                                        <span className="text-global">
                                            Màu sắc
                                        </span>
                                        :{' '}
                                        <span className="text-global font-semibold">
                                            {selectedColor?.color.name}
                                        </span>
                                    </div>

                                    <Flex className="my-2">
                                        {selectedSize?.colors.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            item.stock === 0
                                                                ? null
                                                                : handleChooseColor(
                                                                      item,
                                                                  )
                                                        }
                                                        className={`w-10  ${item.stock === 0 ? 'bg-opacity-60 border-opacity-60 cursor-not-allowed' : 'cursor-pointer'} relative h-10 flex justify-center items-center border-[1px] mr-2 bg-[#f5f5f5] rounded-sm ${selectedColor?._id === item._id ? `border-black` : 'border-[#eee9e9] '}`}
                                                    >
                                                        <div
                                                            className={`border-[1px] p-0.5 rounded-full ${selectedColor?._id === item._id ? 'border-global' : 'border-[#d3d3d3]'}`}
                                                        >
                                                            <div
                                                                className={` w-5  h-5 rounded-full ${item.stock === 0 && 'opacity-55'}`}
                                                                style={{
                                                                    backgroundColor: `${item.color.hex}`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        {item.stock === 0 && (
                                                            <div className="absolute w-10 h-[1px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#777777] rotate-45"></div>
                                                        )}
                                                    </div>
                                                );
                                            },
                                        )}
                                    </Flex>
                                    <span className="text-global text-xs">
                                        Trong kho: {selectedColor?.stock} Sản
                                        phẩm
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center min-h-[20vh] items-center">
                                <span className="text-hover uppercase font-bold text-base">
                                    Sản phẩm hết hàng
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-5 text-global">
                            <Space className="">
                                <Button
                                    disabled={valueQuantity < 2}
                                    onClick={handleDecrement}
                                    className="h-[38px] w-[38px]"
                                >
                                    -
                                </Button>
                                <InputNumber
                                    min={1}
                                    max={selectedColor?.stock}
                                    value={valueQuantity}
                                    className="flex h-[38px] w-[48px] items-center"
                                    controls={false}
                                    onChange={onChangeInputQuantity}
                                    onPressEnter={(e: any)=> {
                                        if(selectedColor && e.target.value > selectedColor.stock){
                                            showMessage(`Số lượng tối đa là ${selectedColor.stock}`,'info')
                                        }
                                    }}
                                    onBlur={(e: any)=> {
                                        if(selectedColor && e.target.value > selectedColor.stock){
                                            showMessage(`Số lượng tối đa là ${selectedColor.stock}`,'info')
                                        }
                                    }}
                                />
                                <Button
                                    disabled={
                                        valueQuantity === selectedColor?.stock
                                    }
                                    onClick={handleIncrement}
                                    className="h-[38px] w-[38px]"
                                >
                                    +
                                </Button>
                            </Space>
                            <>
                                {wishListIds?.includes(item._id as string) ? (
                                    <>
                                        <Button
                                            className="flex h-[38px] text-xs items-center"
                                            type="default"
                                            onClick={handleAddWishlist}
                                            icon={
                                                <HeartFilled className="text-red-500" />
                                            }
                                            loading={pendingWishList}
                                        >
                                            Đã thêm vào yêu thích
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            className="flex h-[38px] text-xs items-center"
                                            type="default"
                                            onClick={handleAddWishlist}
                                            icon={<HeartOutlined />}
                                            loading={pendingWishList}
                                        >
                                            Thêm vào yêu thích
                                        </Button>
                                    </>
                                )}
                            </>
                        </div>
                        <div className="mt-4">
                            <button
                                disabled={isPending}
                                onClick={handleAddToCart}
                                className="bg-white font-medium text-global hover:border-hover hover:text-hover border-[1px] border-global border-opacity-55 duration-300  shadow-md w-[320px] h-[38px] rounded-md flex items-center justify-center"
                            >
                                {isPending ? (
                                    <Spin size="small"></Spin>
                                ) : (
                                    'Thêm vào giỏ hàng'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </motion.div>
    );
}
