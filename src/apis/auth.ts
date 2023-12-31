/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthRequestProp, AuthResponseType } from '../Types/login'
import { GetLogoutResponse, GetUserResponse, UpdateMe } from '../Types/user'
import { URL_API } from '../contants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'

const { REGISTER, LOGIN, VERIFY_EMAIL, CONFIRM_EMAIL, CONFIRM_CODE, RESET_PASSWORD, REFRESH_TOKEN, GET_ME, UPDATE_ME, LOGOUT_OUT, UPLOAD_IMAGE } = URL_API
interface ConfirmCodeMutation {
  forgot_password_token: string
  user_id: string
}

interface UploadImageResponse {
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
    }),

    register: build.mutation<AuthResponseType, AuthRequestProp>({
      query: (data) => ({
        url: REGISTER,
        method: METHOD_API.POST,
        data,
      }),
    }),
    verifyEmail: build.mutation<{ message: string }, { code: string }>({
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

    getMe: build.query<GetUserResponse, any>({
      query: () => ({
        url: GET_ME,
        method: METHOD_API.GET,
      }),
      providesTags: ['getMe']
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
  })
})

export const { useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useConfirmEmailMutation,
  useConfirmCodeMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateMeMutation,
  useUploadImageMutation
}
  = authAPI
