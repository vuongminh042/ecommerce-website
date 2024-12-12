import Banner from '@/components/Banner';
import CarouselDisplay, { CarouselItem } from '@/components/CarouselDisplay';
import DefaultCard from '@/components/ProductCard/DefaultCard';
import ShopBenefits from '@/components/ShopBenefits';
import ShowMoreList from '@/components/ShowMoreList';
import useWindowSize from '@/hooks/_common/useWindowSize';
import { useGetProductBest } from '@/hooks/Products/Queries/useGetProductBest';
import { useGetProductDiscount } from '@/hooks/Products/Queries/useGetProductDiscount';

export default function Homepage() {
    const { data: productBest, isLoading: bestLoading } = useGetProductBest();
    const { data: productDiscount, isLoading: discountLoading } =
        useGetProductDiscount();

    const { windowWidth } = useWindowSize();

    return (
        <>
            <Banner />
            <div className="py-6 border-b-[1px] border-[#c0c0c0] mt-2">
                <div className="max-w-screen-default default:mx-auto mx-8">
                    <ShopBenefits />
                </div>
            </div>

            <div className="my-4 max-w-screen-default default:mx-auto mx-4">
                <div className="mt-4 lg:max-w-[1200px] 2xl:max-w-screen-default w-full default:mx-auto">
                    <h3 className="text-xl text-global font-bold">
                        Sản phẩm nổi bật
                    </h3>

                    <CarouselDisplay className="mt-4">
                        {!discountLoading &&
                            productDiscount?.map((item, index: number) => {
                                return (
                                    <CarouselItem key={index}>
                                        <DefaultCard item={item} />
                                    </CarouselItem>
                                );
                            })}
                    </CarouselDisplay>
                </div>
            </div>

            <div className="mt-4 max-w-screen-default default:mx-auto mx-4">
                <div className="mt-4 lg:max-w-[1200px] 2xl:max-w-screen-default w-full default:mx-auto">
                    {!bestLoading && productBest && (
                        <ShowMoreList
                            enableButton={{
                                enable: true,
                                hrefClick: '/products',
                                limit: windowWidth < 1650 ? 6 : 8,
                            }}
                            data={productBest}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
