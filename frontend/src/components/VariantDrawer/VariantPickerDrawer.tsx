import { CloseOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, InputNumber, Space } from 'antd';
import clsx from 'clsx';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RatingDisplay from '@/components/_common/RatingDisplay';
import { MAIN_ROUTES } from '@/constants/router';
import useFilter from '@/hooks/_common/useFilter';
import { useMutationAddToCart } from '@/hooks/cart/Mutations/useAddCart';
import useMutationAddWishList from '@/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '@/hooks/wishlist/Mutations/useRemoveWishList';
import useGetAllWishlist from '@/hooks/wishlist/Queries/useGetAllWishlist';
import { RootState } from '@/store/store';
import { Product } from '@/types/Product';
import { Currency } from '@/utils';
import showMessage from '@/utils/ShowMessage';
import { IVariant } from '@/types/ProductNew';
type IStateVariant = {
    _id: string;
    price: number;
    discountPercentage?: number;
    stock: number;
    sold?: number;
    sku: string;
    storage?: string;
    image?: string;
    productId: string;
    variantAttributes: any[];
    isActive: boolean;
    imageUrlRef?: string;
};

export default function VariantPickerDrawer({
    children,
    product,
}: {
    children: React.ReactNode;
    product: Product;
}) {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<any>();
    const [active, setActive] = useState<string>();
    const [valueQuantity, setQuantityValue] = useState(1);
    const navigate = useNavigate();
    const addToCart = useMutationAddToCart();
    const user = useSelector((state: RootState) => state.auth.user);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleChangeVariant = (item: IStateVariant) => {
        setVariant(item);
        setActive(item._id);
        if (valueQuantity > item.stock) {
            setQuantityValue(item.stock);
        }
    };

    const handleIncrement = () => {
        if (valueQuantity < (variant ? variant.stock : 0)) setQuantityValue(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setQuantityValue(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setQuantityValue(e ? e : 1);
    };
    const initialVariant = product?.variants?.find((item:any) => item.stock > 0);
    const handleOnSubmit = () => {
        if (user) {
            const bodyAddToCart = {
                productVariation: variant ? variant._id : '',
                userId: user._id,
                quantity: valueQuantity,
            };
            addToCart.mutate(bodyAddToCart, {
                onSuccess: () => {
                    setOpen(false);
                },
            });

            setQuantityValue(1);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    useEffect(() => {
        setVariant(initialVariant);
        setActive(initialVariant?._id || '');
    }, [product]);
    const { query } = useFilter();
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data.wishList.map((item:any) => item._id);
    const { mutate: addWishlist } = useMutationAddWishList();
    const { handleRemoveWishList } = useMutationRemoveWishList();
    const debouncedRemove = debounce((ProductId: string) => handleRemoveWishList(ProductId), 500);
    const handleAddWishlist = () => {
        if (user) {
            addWishlist({ productId: product._id as string });
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };

    return (
        <>
            <div className='w-full' onClick={showDrawer}>
                {children}
            </div>
            <Drawer
                title={
                    <>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-10'>
                                <h3 className='font-bold uppercase text-[#222222]'>{product.name}</h3>
                                <span className='text-[#777777]'>Chọn dạng sản phẩm </span>
                            </div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                placement={'bottom'}
                height={'auto'}
                closeIcon={false}
                onClose={onClose}
                open={open}
            >
                <Space className='flex flex-col lg:flex lg:flex-row'>
                    <Space className='overflow-hidden rounded-[15px]'>
                        {variant?.image && <img className='h-[350px] max-w-[500px] ' src={variant?.image} alt='' />}
                    </Space>
                    <div>
                        <h1 className='text-xl font-medium text-black'>{product.name}</h1>
                        <RatingDisplay rating={5} reviews={0} />
                        <span className='text-xl font-medium text-black'>
                            {variant?.price
                                ? Currency.format(variant?.price!)
                                : Currency.format(product.price)}
                        </span>
                        <div className='mt-2 flex flex-wrap items-center gap-3'>
                            {product?.variants.map((item:any) => {
                                return (
                                    <div
                                        key={item._id}
                                        onClick={() => handleChangeVariant(item)}
                                        className={clsx(
                                            `flex cursor-pointer items-center justify-between gap-3 rounded-md border-2   bg-white px-2 py-1 transition duration-300 hover:opacity-70`,
                                            active === item._id && item.stock >= 1
                                                ? 'border-blue-600 shadow-8'
                                                : 'border-blue-100',
                                            item.stock < 1 || !item.isActive ? 'pointer-events-none opacity-50' : ''
                                        )}
                                    >
                                        <div className='select-none'>
                                            <img
                                                src={item.image}
                                                alt='variant product'
                                                className='h-10 w-10 object-cover'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            {item?.variantAttributes?.map((attr: any, index:number) => (
                                                <span
                                                    key={index}
                                                    className='flex select-none gap-x-2 text-sm font-medium text-black'
                                                >
                                                    <span>{attr.name}:</span>
                                                    <span className='font-normal'>{attr.value}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex flex-col'>
                            <div className='mt-2 flex items-center gap-2'>
                                <span className='select-none  font-medium'>Sản phẩm còn lại:</span>

                                {variant?.stock === 0 || !variant?.isActive ? (
                                    <span className='text-red'>Sản phẩm hết hàng</span>
                                ) : (
                                    ''
                                )}
                                {(variant?.stock as number) > 0 && <span className=''>{variant?.stock}</span>}
                            </div>
                            <div className='flex items-center gap-4'>
                                <Space className='mt-2'>
                                    <Button
                                        disabled={valueQuantity < 2}
                                        className='h-[48px] w-[48px]'
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </Button>
                                    <InputNumber
                                        onChange={onChangeInputQuantity}
                                        min={1}
                                        value={valueQuantity}
                                        max={variant?.stock}
                                        className='flex h-[48px] w-[58px] items-center'
                                        controls={false}
                                    />
                                    <Button
                                        disabled={valueQuantity === variant?.stock || !variant?.isActive}
                                        className='h-[48px] w-[48px]'
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </Button>
                                </Space>
                                <div>
                                    {wishListIds?.includes(product._id as string) ? (
                                        <>
                                            <Button
                                                className='flex items-center'
                                                onClick={() => debouncedRemove(product._id!)}
                                            >
                                                <HeartFilled className='text-red' /> Đã thêm vào yêu thích
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className='flex items-center' onClick={handleAddWishlist}>
                                                <HeartOutlined /> Thêm vào yêu thích
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mt-4 w-[100%]'>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBg: '#16bcdc',
                                                defaultHoverColor: 'white',
                                                defaultHoverBorderColor: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        onClick={handleOnSubmit}
                                        loading={addToCart.isPending}
                                        disabled={variant?.stock === 0 || !variant?.isActive}
                                        className={`h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white ${variant?.stock === 0 || !variant?.isActive ? 'pointer-events-none opacity-60' : 'hover:bg-[#16bcdc]'}`}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                </Space>
            </Drawer>
        </>
    );
}
