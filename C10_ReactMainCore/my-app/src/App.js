import { useState } from 'react'
import './App.css'
import Clock from './Clock'
function App() {
  const [visible, setVisible] = useState(true)
  return (
    <div className='App'>
      <button onClick={() => setVisible(!visible)}>toggle clock</button>
      {visible && <Clock name={'tienhg2001'} />}
    </div>
  )
}

export default App
