import { IProduct } from '@/types/ProductNew';
import DefaultCard from '../ProductCard/DefaultCard';
import { Link } from 'react-router-dom';

type IPropsShowmoreList = {
    data: IProduct[];
    enableButton?: {
        enable: boolean;
        hrefClick?: string;
        textButton?: string;
        limit?: number;
    };
};

export default function ShowMoreList({
    data,
    enableButton = { enable: true, limit: 8, hrefClick: '' },
}: IPropsShowmoreList) {
    return (
        <div>
            <h3 className="text-xl text-global font-bold">Tất cả sản phẩm</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 default:grid-cols-4  gap-8  mt-4">
                {enableButton.enable &&
                    data
                        .slice(0, enableButton.limit)
                        .map((item, index) => (
                            <DefaultCard key={index} item={item} />
                        ))}
                {!enableButton.enable &&
                    data.map((item, index) => (
                        <DefaultCard key={index} item={item} />
                    ))}
            </div>
            {enableButton.enable && (
                <div className="w-full flex justify-center mt-8">
                    <Link
                        className="bg-white duration-300 hover:bg-hover hover:text-white shadow-lg px-6 py-2 rounded-md text-global font-semibold"
                        to={
                            enableButton.hrefClick
                                ? enableButton.hrefClick
                                : '/'
                        }
                    >
                        {enableButton.textButton || 'Xem thêm'}
                    </Link>
                </div>
            )}
        </div>
    );
}
