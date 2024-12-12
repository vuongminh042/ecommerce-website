import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';

const useGetDetailReview = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, userId],
        queryFn: async () => reviewService.getDetailReview(userId),
        enabled: !!userId,
    });
};

export default useGetDetailReview;
