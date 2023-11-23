import { useEffect, useState } from 'react'
import { getUser } from '../api/api'

export default function useUser(value) {
  const [user, setUser] = useState(value)
  useEffect(() => {
    getUser()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])
  return { user }
}
