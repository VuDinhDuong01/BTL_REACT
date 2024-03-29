/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../constants"
import { METHOD_API } from "../helps"
import { Comment } from "../types/comment"

const { GET_COMMENT, LIKE_COMMENT, CREATE_COMMENT, CREATE_REPLIES_COMMENT, UPDATE_COMMENT } = URL_API

export const commentAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getComment: build.query<GenerateType<Comment[]>, { limit: number, page: number, tweet_id: string }>({
            query: ({limit,page, tweet_id}) => ({
                url: `${GET_COMMENT}/${tweet_id}`,
                method: METHOD_API.GET,
                params:{limit, page}
            }),
            providesTags: ['getListTweet', 'getComment', 'getListBookmark']
        }),
        likeComment: build.mutation<GenerateType<{ data: {} }>, { comment_id: string, user_id: string, icon?: string }>({
            query: (data) => ({
                url: LIKE_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment']
        }),
        createComment: build.mutation<GenerateType<{ data: {} }>, { tweet_id: string, user_id: string, content_comment: string, image_comment?: string }>({
            query: (data) => ({
                url: CREATE_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment', 'getListTweet', 'getListBookmark']
        }),
        createRepliesComment: build.mutation<GenerateType<{ data: {} }>, { replies_comment_id: string, user_id: string, replies_content_comment: string, replies_image_comment?: string }>({
            query: (data) => ({
                url: CREATE_REPLIES_COMMENT,
                method: METHOD_API.POST,
                data
            }),
            invalidatesTags: ['getComment']
        }),
        createLikeRepliesComment: build.mutation<GenerateType<{ data: {} }>, {
            user_id: string, icon: string, replies_comment_id: string
        }>({
            query: (data) => ({
                url: UPDATE_COMMENT,
                method: METHOD_API.PATCH,
                data
            }),
            invalidatesTags: ['getComment']
        }),
    })
})

export const {
    useGetCommentQuery,
    useLikeCommentMutation,
    useCreateCommentMutation,
    useCreateRepliesCommentMutation,
    useCreateLikeRepliesCommentMutation
}
    = commentAPI