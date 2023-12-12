
import './App.css'
import { useEffect } from 'react'
import { route } from './hooks/useRoutes'
import { LANGUAGE, keyLocalStorage } from './helps'


function App() {
  
  useEffect(()=>{
    localStorage.getItem(keyLocalStorage.lng)=== null && localStorage.setItem(keyLocalStorage.lng,LANGUAGE.VI)
  },[])

  return (
    <div>
      {route()}
    </div>
  )
}

export default App
