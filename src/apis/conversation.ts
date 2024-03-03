/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../contants"
import { METHOD_API } from "../helps"


const { GET_CONVERSATION, CREATE_CONVERSATIONS } = URL_API

export interface conversations {
    _id: string,
    sender_id: string
    receiver_id: string
    content: string
    images: string
    created_at: string
    updated_at: string
}
export const conversationsAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getConversations: build.mutation<GenerateType<conversations[]>, { limit: number, page: number, receiver_id: string }>({
            query: ({ limit, page, receiver_id }) => ({
                url: `${GET_CONVERSATION}/${receiver_id}`,
                method: METHOD_API.GET,
                params: { limit, page }
            }),
            // invalidatesTags: ['getListTweet', 'getComment', 'getListBookmark']
        }),

        createConversations: build.mutation<GenerateType<{}>, { receiver_id: string, content: string, images: string[] }>({
            query: ({ receiver_id, images, content }) => ({
                url: `${CREATE_CONVERSATIONS}/${receiver_id}`,
                method: METHOD_API.POST,
                data: { content, images }
            }),
            // invalidatesTags: ['getComment', 'getListTweet', 'getListBookmark']
        }),

    })
})

export const {
    useCreateConversationsMutation,
    useGetConversationsMutation,
}
    = conversationsAPI