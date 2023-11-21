
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'


export const auth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getPost: build.query<Post, number>({
     
      query: (id) => ({ url: `post/${id}` }),
     
      transformResponse: (response: { data: Post }, meta, arg) => response.data,
     
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
     
  }),
})