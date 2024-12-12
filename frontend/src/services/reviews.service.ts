import { REVIEW_ENDPOINT } from '@/constants/endpoint';
import { Params } from '@/types/Api';
import { IAxiosResponse } from '@/types/AxiosResponse';
import {
    IAdminReportResponse,
    IAdminReviewResponse,
    IReviewProductResponse,
    IReviewResponse,
    IStarsReviewResponse,
    ReportData,
    ReviewData,
} from '@/types/Review';
import instance from '@/utils/api/axiosIntance';

const reviewService = {
    async getReviewOfProduct(id: string, query: { rating?: string }) {
        const res = await instance.get<IAxiosResponse<IReviewResponse>>(
            `${REVIEW_ENDPOINT.GETOFPRODUCT}?productId=${id}`,
            {
                params: query,
            },
        );
        return res.data;
    },
    async getDetailReview(id: string) {
        const res = await instance.get<IAxiosResponse<IReviewResponse>>(
            `${REVIEW_ENDPOINT.GET_DETAIL}/${id}`,
        );
        return res.data;
    },
    async getAllReviews(params: Params) {
        const res = await instance.get<IAxiosResponse<IAdminReviewResponse>>(
            `${REVIEW_ENDPOINT.GET_ALL}`,
            {
                params,
            },
        );
        return res.data;
    },
    async getStarsReview(productId: string) {
        const res = await instance.get<IAxiosResponse<IStarsReviewResponse>>(
            `${REVIEW_ENDPOINT.STARS_REVIEW}/${productId}`,
        );
        return res.data;
    },
    async getAllReportReviews(params: Params) {
        const res = await instance.get<IAxiosResponse<IAdminReportResponse>>(
            `${REVIEW_ENDPOINT.GET_ALL_REPORT}`,
            {
                params,
            },
        );
        return res.data;
    },
    async createReview(data: ReviewData) {
        const res = await instance.post<IAxiosResponse<IReviewProductResponse>>(
            `${REVIEW_ENDPOINT.CREATE}`,
            data,
        );
        return res.data;
    },
    async createReport(data: ReportData) {
        const res = await instance.post<IAxiosResponse<null>>(
            `${REVIEW_ENDPOINT.CREATE_REPORT}`,
            data,
        );
        return res.data;
    },
    async updateReview(data: ReviewData) {
        const res = await instance.patch<IAxiosResponse<IReviewResponse>>(
            `${REVIEW_ENDPOINT.CREATE}/${data._id}`,
            data,
        );
        return res.data;
    },
    async deleteReview(reviewId: string) {
        const res = await instance.delete<IAxiosResponse<null>>(
            `${REVIEW_ENDPOINT.DELETE_REVIEW}/${reviewId}`,
        );
        return res.data;
    },
    async deleteReport(reportId: string) {
        const res = await instance.delete<IAxiosResponse<null>>(
            `${REVIEW_ENDPOINT.DELETE_REPORT}/${reportId}`,
        );
        return res.data;
    },
};

export default reviewService;
