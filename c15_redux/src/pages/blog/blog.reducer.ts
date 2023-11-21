import { createReducer, createAction } from '@reduxjs/toolkit'
import { initialPostList } from '../../constants/blog'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
}

const initialState: BlogState = {
  postList: initialPostList
}

export const addPost = createAction<Post>('blog/addPost')

const blogReducer = createReducer(initialState, (builder) => {})

export default blogReducer
