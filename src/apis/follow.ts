/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."

import { URL_API } from "../constants"
import { METHOD_API } from "../helps"
import { GenerateType } from "../types/generate"
import { User } from "../types/user"

const { GET_USERS, FOLLOW, GET_FOLLOW } = URL_API

interface TFollowResponse {
    _id: string,
    follower_id: string,
    following_id: string
}
export const bookmarkAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<GenerateType<User[]>, void>({
            query: () => ({
                url: GET_USERS,
                method: METHOD_API.GET,
            }),
        }),
        getFollow: build.query<GenerateType<TFollowResponse[]>, void>({
            query: () => ({
                url: GET_FOLLOW,
                method: METHOD_API.GET,
            }),
            providesTags: ['getFollow']
        }),
        follow: build.mutation<GenerateType<{}>, { follower_id: string, following_id: string }>({
            query: (data) => ({
                url: FOLLOW,
                method: METHOD_API.POST,
                data,
            }),
            invalidatesTags: ['getFollow']
        }),

        // unFollow: build.mutation<GenerateType<{}>, { follower_id: string, following_id: string }>({
        //     query: (data) => ({
        //         url: UN_FOLLOW,
        //         method: METHOD_API.DELETE,
        //         data
        //     }),
        //     invalidatesTags:['getFollow']
        // }),
    })
})

export const {
    useGetUserQuery,
    useFollowMutation,
    // useUnFollowMutation,
    useGetFollowQuery
} = bookmarkAPI