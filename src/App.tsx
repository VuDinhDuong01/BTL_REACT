
import './App.css'
import { useEffect } from 'react'
import { route } from './hooks/useRoutes'


function App() {
  useEffect(()=>{
    localStorage.getItem("lng")=== null && localStorage.setItem("lng","vi")
  },[])

  return (
    <div>
      {route()}
    </div>
  )
}

export default App
