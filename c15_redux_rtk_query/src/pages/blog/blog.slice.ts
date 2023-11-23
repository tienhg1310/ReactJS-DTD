import { createSlice } from '@reduxjs/toolkit'

interface BlogState {
  postId: string
}
const initialState: BlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: {}
})

const blogReducer = blogSlice.reducer

export default blogReducer
