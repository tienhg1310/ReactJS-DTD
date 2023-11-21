import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.reducer'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

// Lấy RootState và Appdispatch từ store
export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch
