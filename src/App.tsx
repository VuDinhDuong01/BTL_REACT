/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useContext } from 'react'
import { route } from './hooks/useRoutes'
import { LANGUAGE, LocalStorageEventTarget, getAccessTokenToLS, getProfileToLS, keyLocalStorage } from './helps'
import { ContextAPI } from './hooks'
import { checkToken } from './helps/check-token'
import { io } from 'socket.io-client'


function App() {
  const { reset, setSocket , socket} = useContext(ContextAPI)
  const accessToken = getAccessTokenToLS()
  const profile = getProfileToLS() as {user_id: string }
  useEffect(() => {
    localStorage.getItem(keyLocalStorage.lng) === null && localStorage.setItem(keyLocalStorage.lng, LANGUAGE.VI)
  }, [])
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])
  useEffect(() => {
    if (accessToken && checkToken(accessToken as string)) {
      setSocket(io("http://localhost:3000", {
        auth: {
          _id: profile.user_id
        }
      }))
    }
  }, [accessToken])
  
  // tắt trình duyệt thì bắn 1 sự kiên emit tới server
  useEffect(() => {
    const handleBeforeUnload = () => {
      socket?.emit('check_user_active',{user_id:profile.user_id, offTab: true})
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket]);

  return (
    <div>
      {route()}
    </div>
  )
}

export default App
