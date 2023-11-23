import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react'

type ActionType = { type: 'decrease_age' } | { type: 'increase_age' } | { type: 'increase_xage'; payload: number }

const decreaseAgeAction = () => {
  return { type: 'decrease_age' } as { type: 'decrease_age' }
}
const increaseAgeAction = () => {
  return { type: 'increase_age' } as { type: 'increase_age' }
}

const increaseXAgeAction = (payload: number) => {
  return { type: 'increase_xage', payload } as { type: 'increase_xage'; payload: number }
}

const initialState = { age: 22 }
const reducer = (state: typeof initialState, action: ActionType) => {
  if (action.type === 'increase_age') {
    return { ...state, age: state.age - 1 }
  }
  if (action.type === 'decrease_age') {
    return { ...state, age: state.age + 1 }
  }
  if (action.type === 'increase_xage') {
    return { ...state, age: state.age + action.payload }
  }
  throw Error('Invalid action', action)
}

const Count: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const decreaseAge = () => {
    dispatch(decreaseAgeAction())
  }

  const increaseAge = () => {
    dispatch(increaseAgeAction())
  }

  const increaseXAge = (value: number) => {
    dispatch(increaseXAgeAction(value))
  }

  return (
    <>
      <button onClick={() => increaseXAge(3)}>decrease 3</button>
      <button onClick={decreaseAge}>decreaseAge</button>
      <section>Count: {state.age}</section>
      <button onClick={increaseAge}>increaseAge</button>
    </>
  )
}

export default Count
