/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getAccessTokenToLS } from '../helps';
import { URL_API } from '../contants';


const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/'
});

instance.interceptors.request.use(function (config) {
    console.log(config)
    const access_token = getAccessTokenToLS();
    // if (access_token) {
        if (config.url === URL_API.LOGIN || config.url === URL_API.REGISTER) {
            config.headers.Authorization = `Bearer ${access_token}`
        }
    // }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
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
