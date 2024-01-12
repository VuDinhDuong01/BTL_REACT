/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getAccessTokenToLS, getRefreshTokenToLS, removeLS, setAccessTokenToLS, setRefreshTokenToLS } from '../helps';
import { URL_API } from '../contants';
import { ToastMessage } from '../helps/toast-message';
import { checkToken } from '../helps/check-token';

let accessToken: string = ''
let refreshToken: string = ''
let getToken: Promise<{ access_token: string, refresh_token: string }> | null = null

const getRefreshToken = getRefreshTokenToLS()

const handleRefreshToken = async () => {
    try {
        const res = await axios.post(`http://localhost:3000/api/v1/refresh_token`, {
            refresh_token: getRefreshToken
        })

        const { access_token, refresh_token } = res.data.data
        return {
            access_token,
            refresh_token
        }
    } catch (error) {
        console.log(error)
    }
}

const instance = axios.create({
    baseURL: `http://localhost:3000/api/v1/`,
    withCredentials: true
});

instance.interceptors.request.use(function (config) {
    const access_token = getAccessTokenToLS();
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.config.url === URL_API.LOGIN) {
        accessToken = response.data.data.access_token
        refreshToken = response.data.data.refresh_token
        setAccessTokenToLS(accessToken)
        setRefreshTokenToLS(refreshToken)
    } else if (response.config.url === URL_API.LOGOUT_OUT) {
        accessToken = ''
        refreshToken = ''
        removeLS()
    }
    return response;
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.message === "Tokens expire" && !originalRequest._retry) {
        if (checkToken(getRefreshTokenToLS() as string)) {
            originalRequest._retry = true;
            return getToken !== null ? getToken : await handleRefreshToken().finally(() => {
                setTimeout(() => {
                    getToken = null
                }, 1000)
            })
                .then(res => {
                    accessToken = res?.access_token
                    refreshToken = res?.refresh_token
                    setAccessTokenToLS(res?.access_token)
                    setRefreshTokenToLS(res?.refresh_token)
                    instance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${res?.access_token}`;
                    return instance(originalRequest)
                })
        } else {
            accessToken = ''
            refreshToken = ''
            removeLS()
            ToastMessage({ message: "refresh_token đã hết hạn", status: 'error' })
        }
    } else {
        console.log(error)
        // accessToken = ''
        //     refreshToken = ''
        //     removeLS()
        // ToastMessage({ message: "Lỗi", status: 'error' })
    }
    return Promise.reject(error);
});
const axiosBaseQuery: BaseQueryFn = async ({ url, method, data, params, headers }) => {
    try {
        const result = await instance({
            url: url,
            method: method,
            data: data,
            params: params,
            headers: headers
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export default axiosBaseQuery;
