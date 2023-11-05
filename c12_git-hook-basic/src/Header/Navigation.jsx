import React, { useEffect, useState } from 'react'
import { getUser } from '../api/api'
import useUser from '../hooks/useUser'

export default function Navigation() {
  const { user } = useUser({})
  return <div>Navigation {user?.name}</div>
}
