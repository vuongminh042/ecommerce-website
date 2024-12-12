import ShopBenefits from '@/components/ShopBenefits';
import { useMutationAddToCart } from '@/hooks/cart/Mutations/useAddCart';
import { useGetDetailProduct } from '@/hooks/Products/Queries/useGetDetailProduct';
import useMutationAddWishList from '@/hooks/wishlist/Mutations/useAddWishList';
import { useMutationRemoveWishList } from '@/hooks/wishlist/Mutations/useRemoveWishList';
import { RootState, useTypedSelector } from '@/store/store';
import { Currency } from '@/utils/FormatCurreny';
import showMessage from '@/utils/ShowMessage';
import {
    HeartFilled,
    HeartOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Collapse,
    ConfigProvider,
    Divider,
    Flex,
    Image,
    InputNumber,
    Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import useGetAllWishlist from '@/hooks/wishlist/Queries/useGetAllWishlist';
import useFilter from '@/hooks/_common/useFilter';
import { MAIN_ROUTES } from '@/constants/router';
import SizeGuideModal from './SizeGuideModal';
import { useGetRelatedProduct } from '@/hooks/Products/Queries/useGetRelatedProduct';
import CarouselDisplay, { CarouselItem } from '@/components/CarouselDisplay';
import DefaultCard from '@/components/ProductCard/DefaultCard';

interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data } = useGetDetailProduct(id ? id : '');
    const { data: relatedProduct } = useGetRelatedProduct(id ? id : '');
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const { mutate: addWishlist } = useMutationAddWishList();
    const { handleRemoveWishList } = useMutationRemoveWishList();
    const navigate = useNavigate();
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
    // Mount State khi trang được khởi tạo để set mặc định variant đầu tiên
    useEffect(() => {
        if (data) {
            setSelectedImage({
                index: 0,
                image: data.variants[0].image,
            });
            const transformedVariants: TransformedVariant[] =
                data.variants.reduce((acc, variant) => {
                    let sizeIndex = acc.findIndex(
                        (item) => item.size._id === variant.size._id,
                    );
                    if (sizeIndex === -1) {
                        acc.push({
                            size: variant.size,
                            colors: [
                                {
                                    color: variant.color,
                                    stock: variant.stock,
                                    image: variant.image,
                                    _id: variant._id,
                                },
                            ],
                        });
                    } else {
                        acc[sizeIndex].colors.push({
                            color: variant.color,
                            stock: variant.stock,
                            image: variant.image,
                            _id: variant._id,
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
    }, [data]);
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
    const { mutate } = useMutationAddToCart();
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
    const handleAddToCart = () => {
        if (isAuth) {
            if (selectedColor) {
                mutate({
                    productId: id,
                    quantity: valueQuantity,
                    variantId: selectedColor._id,
                });
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
    const imageUrlsSet = new Set(data?.variants.map((item) => item.image));
    const map: { [key: string]: number } = {};
    const url = Array.from(imageUrlsSet);
    const uniqueImage = [];
    for (let i = 0; i < url.length; i++) {
        const key = url[i].split('_____')[1];
        if (!map[key]) {
            map[key] = 1;
            uniqueImage.push(url[i]);
        }
    }
    // wishlist
    const { query } = useFilter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data.wishList.map((item) => item._id);
    const debouncedRemove = debounce(
        (ProductId: string) => handleRemoveWishList(ProductId),
        500,
    );
    const handleAddWishlist = () => {
        if (user) {
            if (wishListIds?.includes(id as string)) {
                showMessage('Product already added to wishlist!', 'warning');
                return;
            }
            addWishlist({ productId: id as string });
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };

    return (
        data && (
            <div className="max-w-screen-default default:mx-auto mx-4">
                {/* BREADCRUMB */}
                <div className="breadcrumb">
                    <Breadcrumb
                        className="text-base py-4"
                        separator=">"
                        items={[
                            {
                                title: <Link to={'/'}>Trang chủ</Link>,
                            },
                            {
                                title: (
                                    <Link
                                        to={`/products/?category=${data?.category}`}
                                    >
                                        Sản phẩm
                                    </Link>
                                ),
                            },
                            {
                                title: <p>{data?.name}</p>,
                            },
                        ]}
                    />
                </div>

                {/* MAIN CONTENT */}
                <div className="flex my-4 justify-around">
                    {/* GALLERY */}
                    <div className=" flex gap-3">
                        <div className="w-4/5 rounded-md overflow-hidden">
                            <Image
                                className="w-full"
                                height={600}
                                src={selectedImage.image}
                            />
                        </div>

                        <div className=" flex flex-col gap-2 items-center">
                            {uniqueImage?.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        setSelectedImage({
                                            index,
                                            image: image,
                                        })
                                    }
                                    className={`${
                                        index === selectedImage.index
                                            ? 'border-[1px] border-global'
                                            : 'border-none'
                                    } w-24 cursor-pointer rounded-md overflow-hidden`}
                                >
                                    <img
                                        className="object-cover"
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="w-2/5">
                        <Flex vertical>
                            {/* NAME AND FAVOURITE BUTTON */}
                            <div className="flex justify-between items-center w-full my-1">
                                {/* PRODUCT NAME */}
                                <div className="text-2xl uppercase font-semibold text-global w-4/5">
                                    {data.name}
                                </div>

                                {/* FAVORITE BUTTON */}
                                <div className="w-1/5 text-center">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    defaultHoverColor:
                                                        '#da291c',
                                                    defaultHoverBorderColor:
                                                        '#da291c',
                                                },
                                            },
                                        }}
                                    >
                                        {wishListIds?.includes(id as string) ? (
                                            <>
                                                <Tooltip
                                                    title="Bỏ yêu thích"
                                                    color={'#da291c'}
                                                >
                                                    <Button
                                                        className="text-red-500"
                                                        type="default"
                                                        shape="circle"
                                                        icon={<HeartFilled />}
                                                        onClick={() =>
                                                            debouncedRemove(id!)
                                                        }
                                                    />
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip
                                                    title="Thêm vào yêu thích"
                                                    color={'#da291c'}
                                                >
                                                    <Button
                                                        className="text-red-500"
                                                        type="default"
                                                        shape="circle"
                                                        icon={<HeartOutlined />}
                                                        onClick={
                                                            handleAddWishlist
                                                        }
                                                    />
                                                </Tooltip>
                                            </>
                                        )}
                                    </ConfigProvider>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="font-bold my-2 text-xl text-global">
                                {Currency(data.price)}
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
                                                {selectedSize?.size.name}
                                            </span>
                                        </div>

                                        <Flex className="my-2">
                                            {variantsList?.map(
                                                (item, index) => {
                                                    const hasStock =
                                                        item.colors.some(
                                                            (color: any) =>
                                                                color.stock > 0,
                                                        );

                                                    return (
                                                        <button
                                                            key={index}
                                                            className={`relative mr-1 ${!hasStock ? 'text-[#777777] border-[#d3d3d3]' : ''} w-10 h-10 text-xs rounded-sm ${selectedSize?.size.name === item.size.name ? ' bg-hover text-white font-semibold' : 'border-[1px]'}`}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    item,
                                                                )
                                                            }
                                                            disabled={!hasStock}
                                                        >
                                                            {item.size.name}
                                                            {!hasStock && (
                                                                <div className="absolute w-13 h-[2px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#d3d3d3] rotate-45"></div>
                                                            )}
                                                        </button>
                                                    );
                                                },
                                            )}
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
                                                            {item.stock ===
                                                                0 && (
                                                                <div className="absolute w-10 h-[1px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#777777] rotate-45"></div>
                                                            )}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </Flex>
                                        <span className="text-global text-xs">
                                            Trong kho: {selectedColor?.stock}{' '}
                                            Sản phẩm
                                        </span>
                                    </div>
                                    {selectedColor && (
                                        <div className="mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]">
                                            <Button
                                                onClick={handleDecrement}
                                                disabled={valueQuantity < 2}
                                                className="h-[48px] w-[48px]"
                                            >
                                                -
                                            </Button>
                                            <InputNumber
                                                onChange={onChangeInputQuantity}
                                                onError={(e) => console.log(e)}
                                                min={1}
                                                max={selectedColor.stock}
                                                className="flex h-[48px] w-[58px] items-center"
                                                value={valueQuantity}
                                                controls={false}
                                                onPressEnter={(e: any) => {
                                                    if (
                                                        e.target.value >
                                                        selectedColor.stock
                                                    ) {
                                                        showMessage(
                                                            `Số lượng tối đa là ${selectedColor.stock}`,
                                                            'info',
                                                        );
                                                    }
                                                }}
                                                onBlur={(e: any) => {
                                                    if (
                                                        e.target.value >
                                                        selectedColor.stock
                                                    ) {
                                                        showMessage(
                                                            `Số lượng tối đa là ${selectedColor.stock}`,
                                                            'info',
                                                        );
                                                    }
                                                }}
                                            />
                                            <Button
                                                onClick={handleIncrement}
                                                disabled={
                                                    valueQuantity ===
                                                    selectedColor.stock
                                                }
                                                className="h-[48px] w-[48px]"
                                            >
                                                +
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center min-h-[20vh] items-center">
                                    <span className="text-hover uppercase font-bold text-base">
                                        Sản phẩm hết hàng
                                    </span>
                                </div>
                            )}

                            {/* ADD TO CART */}
                            <Flex gap={15} className="mt-4">
                                <div className="w-3/5">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    defaultHoverBorderColor:
                                                        '#FFFFFF',
                                                    defaultHoverBg: '#da291c',
                                                    defaultHoverColor:
                                                        '#FFFFFF',
                                                },
                                            },
                                        }}
                                    >
                                        <Button
                                            onClick={() => handleAddToCart()}
                                            disabled={
                                                !variantsList || !selectedSize
                                            }
                                            block
                                            icon={
                                                <ShoppingCartOutlined className="text-2xl" />
                                            }
                                            className="bg-white border-[#da291c] text-lg text-[#da291c] font-semibold py-7"
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </ConfigProvider>
                                </div>

                                <div className="w-2/5">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    defaultHoverBorderColor:
                                                        '#FFFFFF',
                                                    defaultHoverBg: '#da291c',
                                                    defaultHoverColor:
                                                        '#FFFFFF',
                                                },
                                            },
                                        }}
                                    ></ConfigProvider>
                                </div>
                            </Flex>

                            {/* MORE INFORMATIONS */}
                            <div>
                                <Divider className="my-4" />

                                <Collapse
                                    expandIconPosition="end"
                                    bordered={false}
                                    ghost
                                    items={[
                                        {
                                            key: 'Mô tả',
                                            label: (
                                                <span className="text-base font-bold">
                                                    Mô tả
                                                </span>
                                            ),
                                            children: (
                                                <p>{data?.description}</p>
                                            ),
                                        },
                                    ]}
                                />
                                {/* <Collapse
                                    expandIconPosition="end"
                                    bordered={false}
                                    ghost
                                    items={[
                                        {
                                            key: 'hướng dẫn sử dụng',
                                            label: (
                                                <span className="text-base font-bold">
                                                    Hướng dẫn sử dụng
                                                </span>
                                            ),
                                            children: (
                                                <p>
                                                    Giặt máy ở chế độ nhẹ, nhiệt
                                                    độ thường. Không sử dụng hóa
                                                    chất tẩy có chứa Clo. Phơi
                                                    trong bóng mát. Sấy khô ở
                                                    nhiệt độ thấp. Là ở nhiệt độ
                                                    thấp 110 độ C. Giặt với sản
                                                    phẩm cùng màu. Không là lên
                                                    chi tiết trang trí.
                                                </p>
                                            ),
                                        },
                                    ]}
                                /> */}
                                <SizeGuideModal />

                                <Divider className="my-4" />
                            </div>
                        </Flex>
                    </div>
                </div>

                <div className="my-10">
                    <ShopBenefits />
                </div>

                {/* RELATED PRODUCTS */}
                <div className="text-global text-xl font-bold mt-2">
                    Gợi ý mua cùng
                </div>
                <CarouselDisplay className="mt-4">
                    {relatedProduct &&
                        relatedProduct.map((item, index: number) => {
                            return (
                                <CarouselItem key={index}>
                                    <DefaultCard item={item} />
                                </CarouselItem>
                            );
                        })}
                </CarouselDisplay>
                {/* <div className="flex flex-cols-4 flex-row-2">
                {arr.map(() => {
                    return (
                        <>
                            <DefaultCard />
                        </>
                    );
                })}
            </div> */}
            </div>
        )
    );
};

export default ProductDetailsPage;
