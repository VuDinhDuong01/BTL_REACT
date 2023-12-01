
import { AuthRequestProp, AuthResponseType } from '../Types/LoginType'
import { URL_API } from '../contants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'

export const authAPI = baseCreateApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponseType, AuthRequestProp>({
      query: (data) => ({
        url: URL_API.REGISTER,
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
  })
})

export const { useLoginMutation, useRegisterMutation } = authAPI
