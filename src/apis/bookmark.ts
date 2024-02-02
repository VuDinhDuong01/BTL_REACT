/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."


import { URL_API } from "../contants"
import { METHOD_API } from "../helps"
import { GenerateType } from "../types/generate"

const { CREATE_BOOKMARK, UN_BOOKMARK, GET_BOOKMARK } = URL_API

export const bookmarkAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        bookmark: build.mutation<GenerateType<{}>, BookmarkProps>({
            query: (data) => ({
                url: CREATE_BOOKMARK,
                method: METHOD_API.POST,
                data,
            }),
        }),

        unBookmark: build.mutation<GenerateType<{}>, BookmarkProps>({
            query: (data) => ({
                url: UN_BOOKMARK,
                method: METHOD_API.DELETE,
                data
            }),
        }),
        getBookmark: build.query<GenerateType<BookmarkResponse[]>, void>({
            query: () => ({
                url: GET_BOOKMARK,
                method: METHOD_API.GET,
            }),
        }),
    })
})

export const {
    useBookmarkMutation,
    useUnBookmarkMutation,
    useGetBookmarkQuery
}
    = bookmarkAPI