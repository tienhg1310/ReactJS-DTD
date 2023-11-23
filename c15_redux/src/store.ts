import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

// Lấy RootState và Appdispatch từ store
export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<Appdispatch>()
