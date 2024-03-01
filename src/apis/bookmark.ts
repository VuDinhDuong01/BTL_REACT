/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."


import { URL_API } from "../contants"
import { METHOD_API } from "../helps"
import { GenerateType } from "../types/generate"
import { Tweet } from "../types/tweet"

const { CREATE_BOOKMARK, UN_BOOKMARK, GET_BOOKMARK } = URL_API

export const bookmarkAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getBookmark: build.query<GenerateType<Tweet[]>, { limit: number, page: number, user_id: string }>({
            query: ({ limit, page, user_id }) => ({
                url: `${GET_BOOKMARK}/${user_id}`,
                method: METHOD_API.GET,
                params: { limit, page }
            }),
            providesTags: ['getListBookmark']
        }),
        bookmark: build.mutation<GenerateType<{}>, BookmarkProps>({
            query: (data) => ({
                url: CREATE_BOOKMARK,
                method: METHOD_API.POST,
                data,
            }),
            invalidatesTags: ['getListBookmark','getListTweet']
        }),

        unBookmark: build.mutation<GenerateType<{}>, BookmarkProps>({
            query: (data) => ({
                url: UN_BOOKMARK,
                method: METHOD_API.DELETE,
                data
            }),
            invalidatesTags: ['getListBookmark','getListTweet']
        }),

    })
})

export const {
    useBookmarkMutation,
    useUnBookmarkMutation,
    useGetBookmarkQuery
} = bookmarkAPI