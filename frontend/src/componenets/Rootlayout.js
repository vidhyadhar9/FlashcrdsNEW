import React from 'react'
import Navbarh from './Navbarh'
import { Outlet } from 'react-router-dom'


function Rootlayout() {
  let token=localStorage.getItem('token')
  return (
    <div className=''>
        <Navbarh/>
        <Outlet/>
    </div>
  )
}

export default Rootlayout