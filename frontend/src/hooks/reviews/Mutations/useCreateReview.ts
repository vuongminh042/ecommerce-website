import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '@/constants/queryKey';
import reviewService from '@/services/reviews.service';
import { setReviewData } from '@/store/slice/rateProductSlice';
import { errorResponse } from '@/types/ErrorResponse';
import { ReviewData } from '@/types/Review';
import showMessage from '@/utils/ShowMessage';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: ReviewData) => reviewService.createReview(data),
        onSuccess() {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.REVIEWS, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
            // @Remove review data in redux and localstorage
            dispatch(setReviewData({ orderId: '', isOpen: false, productId: '', productVariationId: '' }));
            showMessage('Đánh giá thành công', 'success');
        },
        onError: (error: errorResponse) => {
            showMessage(error.response.data.message, 'error');
        },
    });
};

export default useCreateReview;
