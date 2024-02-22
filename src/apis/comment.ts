/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../contants"
import { METHOD_API } from "../helps"
import { Comment } from "../types/comment"

const { GET_COMMENT,LIKE_COMMENT } = URL_API

export const commentAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getComment: build.mutation<GenerateType<Comment[]>, { limit: number, page: number, tweet_id: string }>({
            query: (data) => ({
                url: GET_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getListTweet','getComment']
        }),
        likeComment:build.mutation<GenerateType<{data:{}}>, {comment_id: string ,user_id:string,icon:string }>({
            query: (data) => ({
                url: LIKE_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment']
        }),
    })
})

export const {
    useGetCommentMutation,
    useLikeCommentMutation
}
    = commentAPI