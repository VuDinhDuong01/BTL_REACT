/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GenerateType } from '../types/generate'
import { URL_API } from '../contants/url-api'
import { METHOD_API } from '../helps/methods-api'
import { baseCreateApi } from './createApi'
import { Tweet, TweetProps } from '../types/tweet'

const { CREATE_TWEET } = URL_API

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
        getListTweet: build.query<GenerateType<Tweet[]>, { limit: number, page: number }>({
            query: (params) => ({
                url: CREATE_TWEET,
                method: METHOD_API.GET,
                params
            }),
            providesTags: ['getListTweet']
        }),
    })
})

export const {
    useCreateTweetMutation,
    useGetListTweetQuery
}
    = tweetAPI
