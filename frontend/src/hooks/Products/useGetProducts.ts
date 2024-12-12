import { QUERY_KEY } from '@/constants/queryKey';
import { ProductServices } from '@/services/products.service';
import { Params } from '@/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetProducts = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, ...Object.values(params)],
        queryFn: () => {
            return ProductServices.getAll(params);
        },
    });
};

export default useGetProducts;
