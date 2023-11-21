import React, { createContext } from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
import UserProfile from './UserProfile'

const initialAddress = () => {
  return {
    nation: 'Vietnam',
    city: {
      street: '200 Dien Bien Phu, Da Nang',
      house: 'Building'
    }
  }
}

const getAddress = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nation: 'USA',
        city: {
          street: '100, Nicolas, NY',
          house: 'Building'
        }
      })
    }, 3000)
  })
}

export const UserContext = createContext({
  address: {
    nation: 'Vietnam',
    city: {
      street: '200 Dien Bien Phu, Da Nang',
      house: 'Building'
    }
  },
  firstName: 'Tien',
  age: 100,
  increaseAge: () => {}
})

export default function User() {
  const [firstName, setFirstName] = useState('Alex')
  const [age, setAge] = useState(24)
  const [address, setAddress] = useState(initialAddress)
  const [, forceRerender] = useState(0)
  const increaseAge = () => {
    setAge((prevAge) => prevAge + 1)
  }
  const rerender = () => forceRerender((prevState) => prevState + 1)
  const changeStreet = () => {
    setAddress((prevAddress) => {
      const newCity = { ...prevAddress.city }
      newCity.street = '100 Dien Bien Phu, Da Nang'
      return {
        ...prevAddress,
        city: newCity
      }
    })
  }

  useEffect(() => {
    getAddress().then((res) => {
      setAddress((prevAddress) => {
        const newAddress = { ...prevAddress }
        newAddress.city = res.city
        return newAddress
      })
    })

    return () => {
      console.log('Huy goi API')
    }
  }, [])

  return (
    <div className="App">
      <h1>User Functional component</h1>

      <UserProfile />

      <button onClick={rerender}>Rerender</button>
      <button onClick={changeStreet}>Change Street</button>
    </div>
  )
}
