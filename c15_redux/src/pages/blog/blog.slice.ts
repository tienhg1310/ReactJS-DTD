import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { Post } from '../../types/blog.type'
import http from '../../utils/http'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId?: string | undefined
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: BlogState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const result = await http.get<Post[]>('/posts', { signal: thunkAPI.signal })
  return result.data
})

export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkAPI) => {
  try {
    const result = await http.post<Post>('/posts', body, { signal: thunkAPI.signal })
    return result.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: string; body: Post }, thunkAPI) => {
    try {
      const result = await http.put<Post>(`/posts/${postId}`, body, { signal: thunkAPI.signal })
      return result.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkAPI) => {
  const response = await http.delete(`/posts/${postId}`, { signal: thunkAPI.signal })
  return response.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action: any) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.some((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg
        // state.postList = state.postList.filter((post) => post.id !== postId)
        const deletePostIndex = state.postList.findIndex((post) => post.id === postId)
        state.postList.splice(deletePostIndex, 1)
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading === true && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export const { startEditingPost, cancelEditingPost, finishEditingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer
