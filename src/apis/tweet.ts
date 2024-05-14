/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GenerateType } from '../types/generate'
import { URL_API } from '../constants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'
import { Tweet, TweetProps } from '../types/tweet'

const { CREATE_TWEET, TWEET_DETAIL, DELETE_MANY_TWEET, DELETE_TWEET, ALL_TWEET } = URL_API

export const tweetAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        createTweet: build.mutation<GenerateType<{}>, TweetProps>({
            query: (data) => ({
                url: CREATE_TWEET,
                method: METHOD_API.POST,
                data,
            }),
            invalidatesTags: ['getListTweet']
        }),
        getListTweet: build.query<GenerateType<Tweet[]>, { limit: number, page: number, title_tweet?: string, id_user: string }>({
            query: (params) => ({
                url: CREATE_TWEET,
                method: METHOD_API.GET,
                params
            }),
            providesTags: ['getListTweet']
        }),
        getTweetDetail: build.query<GenerateType<Tweet[]>, { tweet_id: string }>({
            query: ({ tweet_id }) => ({
                url: `${TWEET_DETAIL}/${tweet_id}`,
                method: METHOD_API.GET,
            }),
             providesTags: ['getListTweet']
        }),
        getAllTweet: build.query<any, { limit?: number, page?: number, content?: string, sort_by?: string, order?: string }>({
            query: (params) => ({
                url: ALL_TWEET,
                method: METHOD_API.GET,
                params
            }),
            providesTags: ['getListTweet']
        }),
        deleteTweet: build.mutation<any, { user_id: string }>({
            query: (data) => ({
                url: DELETE_TWEET,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getListTweet']
        }),
        deleteManyTweet: build.mutation<any, { manyId: string[] }>({
            query: (data) => ({
                url: DELETE_MANY_TWEET,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getListTweet']
        }),
    })
})

export const {
    useCreateTweetMutation,
    useGetListTweetQuery,
    useGetTweetDetailQuery,
    useDeleteManyTweetMutation,
    useDeleteTweetMutation,
    useGetAllTweetQuery
}
    = tweetAPI
