/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../constants"
import { METHOD_API } from "../helps"

const { LIKE_TWEET, UN_LIKE_TWEET,ALL_LIKE,DELETE_LIKE,DELETE_MANY_LIKE } = URL_API

export const likeAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        like: build.mutation<GenerateType<{}>, LikeProps>({
            query: (data) => ({
                url: LIKE_TWEET,
                method: METHOD_API.POST,
                data,
            }),
            invalidatesTags: ['getListTweet', 'getListBookmark']
        }),
        unLike: build.mutation<GenerateType<{}>, LikeProps>({
            query: (data) => ({
                url: UN_LIKE_TWEET,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getListTweet', 'getListBookmark']
        }),
        getAllLike: build.query<any, { limit?: number, page?: number, name?: string, sort_by?: string, order?: string }>({
            query: (params) => ({
                url: ALL_LIKE,
                method: METHOD_API.GET,
                params
            }),
            providesTags: ['getAllLike']
        }),
        deleteLike: build.mutation<any, { user_id: string }>({
            query: (data) => ({
                url: DELETE_LIKE,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getAllLike']
        }),
        deleteManyLike: build.mutation<any, { manyId: string[] }>({
            query: (data) => ({
                url: DELETE_MANY_LIKE,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getAllLike']
        }),
    })
})

export const {
    useLikeMutation,
    useUnLikeMutation,
    useDeleteLikeMutation,
    useDeleteManyLikeMutation,
    useGetAllLikeQuery
} = likeAPI