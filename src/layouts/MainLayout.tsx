import {useEffect, type ReactNode} from 'react'

import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/Footer"

export const MainLayout = ({title,childen}:{title:string, childen:ReactNode}) => {
    useEffect(()=>{
        document.title=title
    },[title])

  return (
    <div>
        <Header />
        <div>{childen}</div>
        <Footer />
    </div>
  )
}
