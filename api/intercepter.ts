import axios from "axios";
import {getToken, removeToken} from "@/shared/localStoregate";
import {router} from "expo-router";

const api = axios.create({
    baseURL: "https://dummyjson.com/",
    timeout: 10000,
    headers: {"Content-Type": "application/json"},
});
api.interceptors.request.use(
    async (config) => {
        console.log('📤 Sending Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
        });
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    async (error) => {
        console.log('❌ Request Error:', error);
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        console.log('📥 Response Received:', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    async (error) => {
        console.log('❌ Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
        });
        if (error.response && error.response.status === 401) {
            console.error('Error 401')
            await removeToken();
            router.replace("/login");
        }
        return Promise.reject(error);
    }
);
export default api;
