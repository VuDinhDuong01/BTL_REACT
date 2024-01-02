/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getAccessTokenToLS, getRefreshTokenToLS, removeLS, setAccessTokenToLS, setRefreshTokenToLS } from '../helps';
import { URL_API } from '../contants';

let accessToken: string = ''
let refreshToken: string = ''
const getRefreshToken = getRefreshTokenToLS()
const handleRefreshToken = async (refresh_token: string) => {
    try {
        const res = await axios.post('http://localhost:3000/api/v1/refresh_token', {
            refresh_token
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
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
    console.log(error)
    const res = await handleRefreshToken(getRefreshToken as string)
    console.log(res)
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
