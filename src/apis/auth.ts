/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthRequestProp, AuthResponseType } from '../types/login'
import { GetLogoutResponse, GetUserResponse, UpdateMe, changePasswordProps } from '../types/user'
import { URL_API } from '../constants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'
import { GenerateType } from '../types/generate'
import { Tweet } from '../types/tweet'

const { REGISTER, GET_SEARCH_USER, LOGIN, VERIFY_EMAIL, GET_TWEET_USER, CONFIRM_EMAIL, UPLOAD_VIDEO, CONFIRM_CODE, RESET_PASSWORD, CHANGE_PASSWORD, REFRESH_TOKEN, GET_ME, UPDATE_ME, LOGOUT_OUT, UPLOAD_IMAGE, ALL_USER,
  DELETE_USER,
  DELETE_MANY_USER } = URL_API
interface ConfirmCodeMutation {
  forgot_password_token: string
  user_id: string
}

export interface UploadImageResponse {
  image: string,
  type: number
}

interface ResetPasswordMutation {
  user_id: string,
  password: string
  confirm_password: string
}

export const authAPI = baseCreateApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponseType, AuthRequestProp>({
      query: (data) => ({
        url: LOGIN,
        method: METHOD_API.POST,
        data,
      }),
      invalidatesTags: ['login']
    }),

    register: build.mutation<AuthResponseType, AuthRequestProp>({
      query: (data) => ({
        url: REGISTER,
        method: METHOD_API.POST,
        data,
      }),
    }),
    verifyEmail: build.mutation<{ message: string }, { code: string, user_id: string }>({
      query: (data) => ({
        url: VERIFY_EMAIL,
        method: METHOD_API.POST,
        data,

      }),
    }),
    confirmEmail: build.mutation<{ message: string, data: { _id: string } }, { email: string }>({
      query: (data) => ({
        url: CONFIRM_EMAIL,
        method: METHOD_API.POST,
        data,
      }),
    }),
    confirmCode: build.mutation<{ message: string, data: { _id: string } }, ConfirmCodeMutation>({
      query: ({ user_id, forgot_password_token }) => ({
        url: `${CONFIRM_CODE}/${user_id}`,
        method: METHOD_API.POST,
        data: { forgot_password_token },
      }),
    }),
    resetPassword: build.mutation<{ message?: string, data?: { id: string } }, ResetPasswordMutation>({
      query: ({ user_id, password, confirm_password }) => ({
        url: `${RESET_PASSWORD}/${user_id}`,
        method: METHOD_API.POST,
        data: { password, confirm_password },
      }),
    }),
    refreshToken: build.mutation<{ message?: string, data?: { refresh_token: string, access_token: string } }, { refresh_token: string }>({
      query: (data) => ({
        url: REFRESH_TOKEN,
        method: METHOD_API.POST,
        data
      }),
    }),
    logout: build.mutation<GetLogoutResponse, { refresh_token: string }>({
      query: (data) => ({
        url: LOGOUT_OUT,
        method: METHOD_API.POST,
        data
      }),
    }),

    getMe: build.query<GetUserResponse, { user_id: string }>({
      query: ({ user_id }) => ({
        url: `${GET_ME}/${user_id}`,
        method: METHOD_API.GET,

      }),
      providesTags: ['getMe', 'login']
    }),
    updateMe: build.mutation<GetUserResponse, UpdateMe>({
      query: (data) => ({
        url: UPDATE_ME,
        method: METHOD_API.PATCH,
        data
      }),
      invalidatesTags: ['getMe']
    }),
    uploadImage: build.mutation<UploadImageResponse[], FormData>({
      query: (data) => ({
        url: UPLOAD_IMAGE,
        method: METHOD_API.POST,
        data
      }),
    }),
    uploadVideo: build.mutation<{ message: string, path: string }, FormData>({
      query: (data) => ({
        url: UPLOAD_VIDEO,
        method: METHOD_API.POST,
        data
      }),
    }),
    changePassword: build.mutation<GetUserResponse, changePasswordProps>({
      query: (data) => ({
        url: CHANGE_PASSWORD,
        method: METHOD_API.PATCH,
        data
      }),
    }),
    getTweetUser: build.query<GenerateType<Tweet[]>, { user_id: string, limit?: string, page?: string, title?: string }>({
      query: ({ user_id, limit, page, title }) => ({
        url: `${GET_TWEET_USER}/${user_id}`,
        method: METHOD_API.GET,
        params: { limit, page, title }

      }),
      providesTags: ['getMe', 'login', 'getListTweet']
    }),
    getSearchUser: build.query<GetUserResponse, { user_search: string }>({
      query: (params) => ({
        url: GET_SEARCH_USER,
        method: METHOD_API.GET,
        params

      }),
      // providesTags: ['getMe', 'login','getListTweet']
    }),
    getAllUser: build.query<any, { limit?: number, page?: number, name?: string, sort_by?: string, order?: string }>({
      query: (params) => ({
        url: ALL_USER,
        method: METHOD_API.GET,
        params
      }),
      providesTags: ['getListUser']
    }),
    deleteUser: build.mutation<any, { user_id: string }>({
      query: (data) => ({
        url: DELETE_USER,
        method: METHOD_API.DELETE,
        data
      }),
      invalidatesTags:['getListUser']
    }),
    deleteManyUser: build.mutation<any, { manyId: string[] }>({
      query: (data) => ({
        url: DELETE_MANY_USER,
        method: METHOD_API.DELETE,
        data
      }),
      invalidatesTags:['getListUser']
    }),
  }),


})

export const {
  useGetAllUserQuery,
  useDeleteManyUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useConfirmEmailMutation,
  useConfirmCodeMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateMeMutation,
  useUploadImageMutation,
  useChangePasswordMutation,
  useUploadVideoMutation,
  useGetTweetUserQuery,
  useGetSearchUserQuery,
  
}
  = authAPI
