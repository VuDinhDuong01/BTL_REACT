import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './base-query'


export const baseCreateApi = createApi({
  refetchOnMountOrArgChange:false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: axiosBaseQuery,
    tagTypes:['getMe','getListTweet','login','getComment','getListBookmark','getFollow','getListUser','getAllLike','getDetailSharePost'],
    endpoints: () => ({}),
  })