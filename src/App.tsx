
import './App.css'
import { useEffect, useContext } from 'react'
import { route } from './hooks/useRoutes'
import { LANGUAGE, LocalStorageEventTarget, keyLocalStorage } from './helps'
import { ContextAPI } from './hooks'


function App() {
  const { reset } = useContext(ContextAPI)
  useEffect(() => {
    localStorage.getItem(keyLocalStorage.lng) === null && localStorage.setItem(keyLocalStorage.lng, LANGUAGE.VI)
  }, [])


  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
    <div>
      {route()}
    </div>
  )
}

export default App
