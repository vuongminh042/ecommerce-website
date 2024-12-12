import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { QUERY_KEY } from '@/constants/queryKey';
import { ReviewParams } from '@/pages/Clients/ProductDetails/_components/Description/ReviewsContent';
import reviewService from '@/services/reviews.service';

const useGetReviewOfProduct = (id: string, query: ReviewParams) => {
    const cleanedObj = _.omitBy(query, _.isEmpty);
    return useQuery({
        queryKey: [QUERY_KEY.REVIEWS, id, ...Object.values(cleanedObj)],
        queryFn: () => reviewService.getReviewOfProduct(id, cleanedObj),
    });
};

export default useGetReviewOfProduct;
