import { AnyAction, Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isEntityError } from './utils/helpers'

function isPayloadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejectedWithValue()) {
    if (isPayloadErrorMessage(action.payload)) {
      toast.warn(action.payload.data.error)
    } else if (!isEntityError(action.payload)) {
      toast.warn(action.error.message)
    }
  }
  return next(action)
}
