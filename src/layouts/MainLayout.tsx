import {useEffect, type ReactNode} from 'react'

import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/Footer"

export const MainLayout = ({title,children}:{title:string, children:ReactNode}) => {

    useEffect(()=>{
        document.title=title
    },[title])

  return (
    <>
        <Header />
        <div>{children}</div>
        <Footer />
    </>
  )
}
