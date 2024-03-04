/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../contants"
import { METHOD_API } from "../helps"


const { GET_CONVERSATION } = URL_API
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
        getConversations: build.query<GenerateType<conversations[]>, { limit: number, page: number, receiver_id: string }>({
            query: ({ limit, page, receiver_id }) => ({
                url: `${GET_CONVERSATION}/${receiver_id}`,
                method: METHOD_API.GET,
                params: { limit, page }
            }),
        }),
    })
})

export const {
    
    useGetConversationsQuery,
}
    = conversationsAPI