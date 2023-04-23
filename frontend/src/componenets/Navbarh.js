import React from 'react'
import { Link } from 'react-router-dom'
import './Navbarh.css'
import {BsCaretDown} from "react-icons/bs"

function Navbarh() {

  return (
   

    <div className='container'>
    <nav className="navbar navbar-expand-lg navbar-light  ">
    <div className=" navbar-collapse nav-parent" id="navbarNav" >
      
    <ul className="navbar-nav ">


      {/* link to home */}
      <li className="nav-item nav-childs ">
        <Link className="nav-link  " to="/"><button className='btn '>Home</button></Link>
      </li>

     {/* link to Mycalender */}
      <li className="nav-item nav-childs" >
        <Link className="nav-link " to="/Mycalender"><button className='btn'>Mycalender</button> </Link>
      </li>


       {/* link to home Widgets*/}
      <li className="nav-item nav-childs">
        <Link className="nav-link " to="/Widgets"><button className='btn '>Widgets <BsCaretDown/></button></Link>
      </li>
      <li  className="nav-item nav-childs">
        <img src="https://wallpaperaccess.com/full/3078918.jpg" alt="" srcset="" width={50} className='img' />
      </li>
    </ul>
  </div>
</nav>
  </div>
    
  )
}

export default Navbarh