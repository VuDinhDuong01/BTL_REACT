

import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/Footer"

import { Outlet } from 'react-router-dom'
export const MainLayout = () => {


  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
