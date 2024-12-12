import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';
import { errorResponse } from '@/types/ErrorResponse';
import { ReviewData } from '@/types/Review';
import showMessage from '@/utils/ShowMessage';

const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.updateReview(data),
        onSuccess(res) {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.REVIEWS, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            showMessage('Sửa đánh giá thành công', 'success');
        },
        onError(error: errorResponse) {
            console.log(error.response.data.message);
        },
    });
};

export default useUpdateReview;
