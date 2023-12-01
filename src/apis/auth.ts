
import { AuthRequest, LoginResponse } from '../Types/LoginType'
import { URL_API } from '../contants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'

const authAPI = baseCreateApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, AuthRequest>({
      query: (data) => ({
        url: URL_API.REGISTER,
        method: METHOD_API.POST,
        data,
      }),
    }),

    register: build.mutation<LoginResponse, AuthRequest>({
      query: (data) => ({
        url: URL_API.REGISTER,
        method: METHOD_API.POST,
        data,
      }),
    }),
  })
})

export const {useLoginMutation, useRegisterMutation}= authAPI
