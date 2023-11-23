import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './title.module.scss'
import { title } from 'process'

type AddressTypes = {
  address: {
    street: string
  }
  handleClickTitle: (value: any) => void
}

const Title = (props: AddressTypes) => {
  console.log(props)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  return (
    <h1 className={styles.title} ref={h1Ref}>
      TodoList {`${props.address.street}`}
    </h1>
  )
}

export default memo(Title)
