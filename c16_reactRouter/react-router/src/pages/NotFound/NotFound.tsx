import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/', { state: 'Rediredted from NotFound' })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [navigate])

  return <div>NotFound</div>
}

export default NotFound
