import './App.scss'
import { useState } from 'react'
import ModuleTest from './Component/ModuleTest'

function App() {
  const [isShow, setIsShow] = useState(true)
  return (
    <div className='App'>
      <div className='Buttons'>
        <button className='Button-item' style={{ color: 'white', border: 'none', display: isShow ? 'block' : 'none' }}>
          Hello
        </button>
      </div>
      <ModuleTest />
    </div>
  )
}

export default App
