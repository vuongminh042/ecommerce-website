import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import sizeService from '@/services/size.service';
import colorService from '@/services/color.service';

const useGetDetailColor = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.COLORS, id],
        queryFn: async () => {
            const res = await colorService.getDetail(id);
            return res.data;
        },
        enabled: !!id,
    });
};

export default useGetDetailColor;
