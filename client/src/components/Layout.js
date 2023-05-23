import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import Footer from "./Footer"

export default function Layout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </>
  )
}