import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';
const useGetStarsReview = (productId:string) => {
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS],
        queryFn: () => reviewService.getStarsReview(productId),
    });
};

export default useGetStarsReview;
