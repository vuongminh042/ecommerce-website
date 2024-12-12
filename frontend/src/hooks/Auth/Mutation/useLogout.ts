import { QUERY_KEY } from '@/constants/queryKey';
import { MAIN_ROUTES } from '@/constants/router';
import { doLogout } from '@/store/slice/authSlice';
import showMessage from '@/utils/ShowMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const useLogout = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const segment = useLocation();
    const handleLogout = () => {
        queryClient.removeQueries({
            queryKey: [QUERY_KEY.CART],
        });
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        if (segment.pathname !== MAIN_ROUTES.VERIFY) {
            navigator('/');
        }
        dispatch(doLogout());
        queryClient.removeQueries({ queryKey: [QUERY_KEY.USERS] });
        queryClient.resetQueries();
    };
    return handleLogout;
};

export default useLogout;
