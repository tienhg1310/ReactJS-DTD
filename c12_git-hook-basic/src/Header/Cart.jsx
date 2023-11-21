import React, { useEffect, useState } from 'react'
import { getUser } from '../api/api'
import useUser from '../hooks/useUser'

export default function Cart() {
  const { user } = useUser({})
  return <div>Cart {user?.name}</div>
}
