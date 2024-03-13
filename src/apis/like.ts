/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../constants"
import { METHOD_API } from "../helps"

const { LIKE_TWEET, UN_LIKE_TWEET } = URL_API

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
    })
})

export const {
    useLikeMutation,
    useUnLikeMutation
}
    = likeAPI