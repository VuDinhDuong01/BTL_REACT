/* eslint-disable @typescript-eslint/ban-types */

import { baseCreateApi } from "."

import { URL_API } from "../constants"
import { METHOD_API } from "../helps"
import { GenerateType } from "../types/generate"

const {CREATE_SHARE_POST } = URL_API

interface TRequest {
  userId:string 
  postId:string 
  medias: string[],
  content:string 
}
export const sharePostAPI = baseCreateApi.injectEndpoints({
    endpoints: build => ({

        createSharePost: build.mutation<GenerateType<{}>, TRequest>({
            query: (data) => ({
                url: CREATE_SHARE_POST,
                method: METHOD_API.POST,
                data,
            }),
            invalidatesTags: ['getDetailSharePost','getListTweet']
        }),

        // unFollow: build.mutation<GenerateType<{}>, { follower_id: string, following_id: string }>({
        //     query: (data) => ({
        //         url: UN_FOLLOW,
        //         method: METHOD_API.DELETE,
        //         data
        //     }),
        //     invalidatesTags:['getFollow']
        // }),
    })
})

export const {
    useCreateSharePostMutation,
} = sharePostAPI