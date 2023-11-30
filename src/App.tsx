
import './App.css'
import { useEffect } from 'react'
// import { route } from './hooks/useRoutes'


import { Login } from './pages/Login'
function App() {
  useEffect(()=>{
    localStorage.getItem("lng")=== null && localStorage.setItem("lng","vi")
  },[])

  return (
    <div>
      <Login />
    </div>
  )
}

export default App
