import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';
import { errorResponse } from '@/types/ErrorResponse';
import showMessage from '@/utils/ShowMessage';

const useDeleteReview = (reviewId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => reviewService.deleteReview(reviewId),
        onSuccess() {
            showMessage('Xóa đánh giá thành công', 'success');

            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.REVIEWS, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
        },
        onError(error: errorResponse) {
            console.log(error.response.data.message);
        },
    });
};

export default useDeleteReview;
