/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../contants"
import { METHOD_API } from "../helps"
import { Comment } from "../types/comment"

const { GET_COMMENT, LIKE_COMMENT, CREATE_COMMENT ,CREATE_REPLIES_COMMENT} = URL_API

export const commentAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getComment: build.mutation<GenerateType<Comment[]>, { limit: number, page: number, tweet_id: string }>({
            query: (data) => ({
                url: GET_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getListTweet', 'getComment']
        }),
        likeComment: build.mutation<GenerateType<{ data: {} }>, { comment_id: string, user_id: string, icon: string }>({
            query: (data) => ({
                url: LIKE_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment']
        }),
        createComment: build.mutation<GenerateType<{ data: {} }>, { tweet_id: string, user_id: string,  content_comment: string, image_comment?: string }>({
            query: (data) => ({
                url: CREATE_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment','getListTweet']
        }),
        createRepliesComment:build.mutation<GenerateType<{ data: {} }>, { replies_comment_id: string, user_id: string,  replies_content_comment: string, replies_image_comment?: string }>({
            query: (data) => ({
                url: CREATE_REPLIES_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment']
        }),
    })
})

export const {
    useGetCommentMutation,
    useLikeCommentMutation,
    useCreateCommentMutation,
    useCreateRepliesCommentMutation
}
    = commentAPI