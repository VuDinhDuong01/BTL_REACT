/* eslint-disable @typescript-eslint/ban-types */
import { baseCreateApi } from "."
import { GenerateType } from "../types/generate"
import { URL_API } from "../constants"
import { METHOD_API } from "../helps"
import { NotificationType } from "../components/post"


const { GET_NOTIFICATION } = URL_API
export interface Notification {
    _id: string,
    sender_id?: string
    receiver_id: string
    tweet_id?: string
    avatar: string
    username: string
    status: string
    created_at: string
    updated_at: string
}
export const notificationAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({
        getNotification: build.query<GenerateType<NotificationType[]>, { limit: number, page: number, user_id: string }>({
            query: ({ limit, page, user_id }) => ({
                url: `${GET_NOTIFICATION}/${user_id}`,
                method: METHOD_API.GET,
                params: { limit, page }
            }),
        }),
    })
})

export const {
    useGetNotificationQuery
}
    = notificationAPI