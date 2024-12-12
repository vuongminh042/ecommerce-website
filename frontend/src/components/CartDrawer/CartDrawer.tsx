import { MAIN_ROUTES } from '@/constants/router';
import { useCart } from '@/hooks/_common/useCart';
import { useMutationRemoveItem } from '@/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '@/hooks/cart/Mutations/useUpdateQuantity';
import { Product } from '@/types/Product';
import { Currency } from '@/utils/FormatCurreny';
import {
    CloseOutlined,
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {
    Button,
    ConfigProvider,
    Drawer,
    Image,
    InputNumber,
    List,
    message,
    Popconfirm,
    PopconfirmProps,
} from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
    children: React.ReactNode;
    data: any;
    isFetching: boolean;
};
const CartDrawer = ({ data, isFetching, children }: PropsType) => {
    const { cart, handleOpenCart, onClose } = useCart();
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const { handleRemoveCart, isPending } = useMutationRemoveItem();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const [quantityProduct, setQuantityProduct] = useState<
        { quantity: number; id: string }[]
    >([]);
    const [pendingUpdates, setPendingUpdates] = useState<{
        productId: string;
        variantId: string;
        quantity: number;
    } | null>(null);
    useEffect(() => {
        if (data && !isFetching) {
            console.log('setState');
            const newArr = data.items.map(({ quantity, variantId }: any) => ({
                quantity,
                id: variantId,
            }));
            setQuantityProduct(newArr);
        }
    }, [data, isFetching]);
    const handleChangeQuantity = (
        productId: string,
        variantId: string,
        newQuantity: number,
    ) => {
        setQuantityProduct((prev: any) =>
            prev.map((itemCart: any) =>
                itemCart.id === variantId
                    ? { ...itemCart, quantity: newQuantity }
                    : itemCart,
            ),
        );
        setPendingUpdates({
            productId: productId,
            variantId: variantId,
            quantity: newQuantity,
        });
    };
    /* eslint-disable */
    const debouncedUpdate = useCallback(
        debounce(async (payload) => {
            await updateQuantity(payload);
        }, 500),
        [],
    );
    /* eslint-disable */
    useEffect(() => {
        if (pendingUpdates) {
            debouncedUpdate({
                ...pendingUpdates,
            });
        }
    }, [pendingUpdates, debouncedUpdate]);
    const handleIncreaseQuantity = (productId: string, variantId: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            return prev.map((itemCart) =>
                itemCart.id === variantId
                    ? { ...itemCart, quantity: itemCart.quantity + 1 }
                    : itemCart,
            );
        });
        const newQuantity =
            (quantityProduct.find((itemCart) => itemCart.id === variantId)
                ?.quantity || 0) + 1;
        handleChangeQuantity(productId, variantId, newQuantity);
    };
    const handleDecreaseQuantity = (productId: string, variantId: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            const itemFill = prev.find((itemCart) => itemCart.id === variantId);
            if (itemFill && itemFill.quantity > 1) {
                return prev.map((itemCart) =>
                    itemCart.id === variantId
                        ? { ...itemCart, quantity: itemCart.quantity - 1 }
                        : itemCart,
                );
            }
            return prev;
        });
        const newQuantity =
            (quantityProduct.find((itemCart) => itemCart.id === variantId)
                ?.quantity || 0) - 1;
        handleChangeQuantity(productId, variantId, newQuantity);
    };
    const totalPrice = data?.items?.reduce((total: number, item: any) => {
        return total + item.price * item.quantity;
    }, 0);

    const confirm: PopconfirmProps['onConfirm'] = (variantId: any) => {
        handleRemoveCart(variantId);
        message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    // const cancel: PopconfirmProps['onCancel'] = (e) => {
    //     console.log(e);
    // };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <span className={'cursor-pointer'} onClick={handleOpenCart}>
                {children}
            </span>
            <Drawer
                title={
                    <>
                        {/* <div className='h-[4px] w-full'>{isPending && <LoadingBar />}</div> */}
                        <div className="flex items-center justify-between">
                            <div className="font-bold uppercase text-black">
                                Giỏ Hàng
                            </div>
                            <Button type="text" onClick={onClose}>
                                <CloseOutlined className="transform text-xl transition duration-500 hover:rotate-180" />
                            </Button>
                        </div>
                    </>
                }
                width={'35vw'}
                placement="right"
                closable={false}
                onClose={onClose}
                open={cart}
                // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                {data && data.items.length > 0 && (
                    <>
                        <List
                            itemLayout="vertical"
                            className="h-[40vh] w-full overflow-x-hidden overflow-y-scroll"
                            dataSource={data.items}
                            renderItem={(product: any) => {
                                const quantity =
                                    quantityProduct?.find(
                                        (p) => p.id === product.variantId,
                                    )?.quantity || 0;
                                return (
                                    <List.Item key={product._id}>
                                        <div className="flex w-full items-center justify-between">
                                            <List.Item.Meta
                                                avatar={
                                                    <Image
                                                        className=" rounded-md w-[80px] max-w-[80px]"
                                                        src={product.image}
                                                    />
                                                }
                                                description={
                                                    <>
                                                        <Link
                                                            className="text-base font-bold text-global hover:text-hover"
                                                            to={`${MAIN_ROUTES.PRODUCTS}/${product?.productId}`}
                                                        >
                                                            {product?.name}
                                                        </Link>
                                                        <div className="flex justify-between">
                                                            <div className="flex items-center justify-between w-full">
                                                                <div className="flex flex-col">
                                                                    <div className="flex flex-col">
                                                                        <span>
                                                                            Size:
                                                                            {' ' +
                                                                                product.size}
                                                                        </span>
                                                                        <span>
                                                                            Màu:
                                                                            {' ' +
                                                                                product.color}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span
                                                                            className={clsx(
                                                                                'text-base font-semibold leading-5 text-[#222]',
                                                                                // {
                                                                                //     'text-red-600':
                                                                                //         product.productId.discountPercentage > 0,
                                                                                // }
                                                                            )}
                                                                        >
                                                                            {Currency(
                                                                                product.price,
                                                                            )}
                                                                        </span>
                                                                        <span className="text-hover text-xs px-1  border-[1px] rounded-sm py-0.5">
                                                                            -
                                                                            {
                                                                                product.discount
                                                                            }
                                                                            %
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-5 flex items-center justify-center">
                                                                    <Button
                                                                        disabled={
                                                                            quantity <
                                                                            2
                                                                        }
                                                                        type="default"
                                                                        icon={
                                                                            <MinusOutlined className="transform transition duration-500 hover:rotate-180" />
                                                                        }
                                                                        onClick={() =>
                                                                            handleDecreaseQuantity(
                                                                                product.productId,
                                                                                product.variantId,
                                                                            )
                                                                        }
                                                                    />
                                                                    <ConfigProvider
                                                                        theme={{
                                                                            token: {
                                                                                colorBgContainerDisabled:
                                                                                    'white',
                                                                                colorTextDisabled:
                                                                                    'black',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <InputNumber
                                                                            min={
                                                                                1
                                                                            }
                                                                            disabled={
                                                                                true
                                                                            }
                                                                            className=""
                                                                            value={
                                                                                quantity
                                                                            }
                                                                        />
                                                                    </ConfigProvider>

                                                                    <Button
                                                                        disabled={
                                                                            quantity ===
                                                                            product.stock
                                                                        }
                                                                        onClick={() =>
                                                                            handleIncreaseQuantity(
                                                                                product.productId,
                                                                                product.variantId,
                                                                            )
                                                                        }
                                                                        type="default"
                                                                        icon={
                                                                            <PlusOutlined className="transform transition duration-500 hover:rotate-180" />
                                                                        }
                                                                    />
                                                                </div>
                                                                {/* {product.productId.discountPercentage > 0 && (
                                                    <del className='text-base font-semibold leading-5 text-gray-400 '>
                                                        {Currency.format(
                                                            product.productId.price *
                                                                product.quantity *
                                                                (1 + product.productId.discountPercentage / 100)
                                                        )}
                                                    </del>
                                                )} */}
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            />
                                            <Popconfirm
                                                title="Thông báo"
                                                description="Bạn có chắc là muốn xóa sản phẩm này khỏi giỏ hàng?"
                                                onConfirm={() =>
                                                    confirm(product.variantId)
                                                }
                                                placement="leftTop"
                                                okText="Đồng ý"
                                                cancelText="Hủy"
                                            >
                                                <Button
                                                    loading={isPending}
                                                    type="text"
                                                    className="mb-20 text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </List.Item>
                                );
                            }}
                        />

                        {/* {totalOrderAmount < freeShippingThreshold && (
                     <div className='free-shipping__text mb-14'>
                         <Slider
                             className='custom-slider'
                             min={0}
                             max={freeShippingThreshold}
                             marks={marks}
                             value={Math.min(totalOrderAmount, freeShippingThreshold)}
                             step={null}
                             trackStyle={{ background: '#FF0000' }}
                         />
                         {totalOrderAmount < freeShippingThreshold && (
                             <p className='mt-8 text-base'>
                                 Spend ${freeShippingThreshold - totalOrderAmount} more and get
                                 <span className='text-[#16bcdc]'>Free Shipping !</span>
                             </p>
                         )}
                     </div>
                 )} */}
                        <div className="border-gray-200 border-t px-4 py-6">
                            <div className="text-gray-900 flex justify-between text-base font-bold">
                                <p className="text-sm uppercase text-global font-semibold">
                                    Tổng đơn hàng:
                                </p>
                                <p className="text-base text-[#cc1414]">
                                    {Currency(totalPrice)}
                                </p>
                            </div>
                            <div className="mt-6">
                                <Link to={MAIN_ROUTES.CART}>
                                    <button
                                        onClick={onClose}
                                        className="h-[50px] bg-white text-sm font-semibold uppercase text-black transition-colors border-[1px] rounded-md w-full duration-300 hover:border-hover hover:text-hover"
                                    >
                                        Xem giỏ hàng
                                    </button>
                                </Link>
                            </div>

                            <div className="text-gray-500 mt-6 flex justify-center text-center text-sm">
                                <p className="text-global">
                                    Hoặc{' '}
                                    <button
                                        className="font-medium text-hover hover:text-global duration-300 ml-1"
                                        onClick={onClose}
                                    >
                                        Tiếp tục mua hàng
                                    </button>
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {!data && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <img
                            src="https://canifa.com/assets/images/cart-empty.png"
                            alt=""
                        />
                        <p className="text-center text-global text-xl font-medium leading-6">
                            Giỏ hàng hiện không có sản phẩm.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-12 h-[48px] rounded-md  px-12 font-bold border-[1px] text-[#da291c] border-[#da291c]"
                        >
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
                {data?.items?.length === 0 && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <img
                            src="https://canifa.com/assets/images/cart-empty.png"
                            alt=""
                        />
                        <p className="text-center text-global text-xl font-medium leading-6">
                            Giỏ hàng hiện không có sản phẩm.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-12 h-[48px] rounded-md  px-12 font-bold border-[1px] text-[#da291c] border-[#da291c]"
                        >
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
            </Drawer>
        </motion.div>
    );
};

export default CartDrawer;
