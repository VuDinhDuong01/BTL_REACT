
import { AuthRequestProp, AuthResponseType } from '../Types/LoginType'
import { URL_API } from '../contants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'

interface ConfirmCodeMutation {
  forgot_password_token: string
  user_id: string
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
        url: URL_API.LOGIN,
        method: METHOD_API.POST,
        data,
      }),
    }),

    register: build.mutation<AuthResponseType, AuthRequestProp>({
      query: (data) => ({
        url: URL_API.REGISTER,
        method: METHOD_API.POST,
        data,
      }),
    }),
    verifyEmail: build.mutation<{ message: string }, { code: string }>({
      query: (data) => ({
        url: URL_API.VERIFY_EMAIL,
        method: METHOD_API.POST,
        data,

      }),
    }),
    confirmEmail: build.mutation<{ message: string, data: { _id: string } }, { email: string }>({
      query: (data) => ({
        url: URL_API.CONFIRM_EMAIL,
        method: METHOD_API.POST,
        data,
      }),
    }),
    confirmCode: build.mutation<{ message: string, data: { _id: string } }, ConfirmCodeMutation>({
      query: ({ user_id, forgot_password_token }) => ({
        url: `${URL_API.CONFIRM_CODE}/${user_id}`,
        method: METHOD_API.POST,
        data: { forgot_password_token },
      }),
    }),
    resetPassword: build.mutation<{ message?: string, data?: { id: string } }, ResetPasswordMutation>({
      query: ({ user_id, password, confirm_password }) => ({
        url: `${URL_API.RESET_PASSWORD}/${user_id}`,
        method: METHOD_API.POST,
        data: { password, confirm_password },
      }),
    }),

  })
})

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useConfirmEmailMutation, useConfirmCodeMutation, useResetPasswordMutation } = authAPI
