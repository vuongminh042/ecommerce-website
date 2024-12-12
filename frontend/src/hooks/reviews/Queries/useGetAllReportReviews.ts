import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';
import { Params } from '@/types/Api';

const useGetAllReportReviews = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.REPORT_REVIEWS,...Object.values(params)],
        queryFn: () => reviewService.getAllReportReviews(params),
    });
};

export default useGetAllReportReviews;
