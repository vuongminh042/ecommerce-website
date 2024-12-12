import { TAG_ENDPOINT } from '@/constants/endpoint';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { ICategoryFormData } from '@/types/Category';
import { ITag, ITagFormData, ITagResponse } from '@/types/Tag';
import instance from '@/utils/api/axiosIntance';
import { Params } from 'react-router-dom';

const tagService = {
    async getAll(params: Params) {
        const res = await instance.get<IAxiosResponse<ITagResponse>>(
            `${TAG_ENDPOINT.ALL}`,
            { params },
        );
        return res.data;
    },
    async getAllTagsNoParams() {
        const res = await instance.get<IAxiosResponse<ITagResponse>>(
            `${TAG_ENDPOINT.ALL}`,
            { params: { limit: 10000, page: 1 } },
        );
        return res.data;
    },
    async createTag(payload: ICategoryFormData) {
        const res = await instance.post<IAxiosResponse<ITag>>(
            `${TAG_ENDPOINT.CREATE}`,
            payload,
        );
        return res.data;
    },
    async updateTag(id: string, payload: ITagFormData) {
        const res = await instance.patch<IAxiosResponse<ITag>>(
            `${TAG_ENDPOINT.UPDATE}/${id}`,
            payload,
        );
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<ITag>>(
            `${TAG_ENDPOINT.DETAIL}/${id}`,
        );
        return res.data;
    },
};

export default tagService;
