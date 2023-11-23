import React, { useEffect, useRef, useState } from 'react'

function WatchTimer() {
  const [seconds, setSeconds] = useState<number>(0)

  const intervalRef = useRef<any>(null)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
      console.log('render')
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
      console.log('component unmount')
    }
  }, [])
  return <div>Watch: {seconds}</div>
}

const Watch = () => {
  const [visible, setVisible] = useState<boolean>(true)
  return (
    <>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <WatchTimer />}
    </>
  )
}

export default Watch
