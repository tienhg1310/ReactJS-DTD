import React, { useContext } from 'react'
import { UserContext } from './User'

export default function Profile() {
  const { firstName, age, address } = useContext(UserContext)
  console.log({ firstName, age, address })
  return (
    <ul>
      <li>{firstName}</li>
      <li>{age}</li>
      <li>{address.nation}</li>
      <li>{address.city.street}</li>
      <li>{address.city.house}</li>
    </ul>
  )
}
