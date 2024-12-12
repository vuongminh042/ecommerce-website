import axios from 'axios';
import { getAccessToken } from './apiHelper';
const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    // headers: getContentType(),
    withCredentials: true,
};

let logoutCallback: (() => void) | null = null;
export const registerLogoutCallback = (callback: () => void) => {
    logoutCallback = callback;
};
const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if (config && config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            if (originalRequest._retry) {
                return Promise.reject(error);
            }
            originalRequest._retry = true;
            if (logoutCallback) {
                logoutCallback(); 
            }
            return Promise.reject(error); 
        }

        return Promise.reject(error);
    }
)

export default instance;
