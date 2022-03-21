import React, { useState } from 'react'
import bull from '../img/bull.png'
import '../styles/main.css'

const App = () => {
  const [rotate, setRotate] = useState('initial')
  const clearEffect = () => {
    setRotate('back')
  }
  return (
    <div
      role="button"
      tabIndex={0}
      className={rotate}
      onClick={(e) => {
        e.preventDefault()
        setRotate('rotate')
        setTimeout(() => {
          clearEffect()
        }, 4000)
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          setRotate('rotate')
        }
        setTimeout(() => {
          clearEffect()
        }, 4000)
      }}
    >
      Boilerplate
      <img src={bull} alt="bull_logo" />
    </div>
  )
}

export default App
