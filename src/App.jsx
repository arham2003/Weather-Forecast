import React from 'react'
import Weather from './components/Weather'
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div className='app'>
      
      <Weather/>
      <Toaster/>
    </div>
  )
}

export default App