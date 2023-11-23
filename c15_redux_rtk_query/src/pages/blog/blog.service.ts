import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../../types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi', // Tên field trong redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`
    })
  })
})

export const { useGetPostsQuery } = blogApi
