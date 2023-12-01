import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { fetchBaseQuery } from './base-query'

export const baseCreateApi = createApi({
  refetchOnMountOrArgChange:false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    tagTypes:[''],
    endpoints: () => ({}),
  })