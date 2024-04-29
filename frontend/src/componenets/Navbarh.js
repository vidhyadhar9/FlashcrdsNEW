import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbarh() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log("Token is : ", token);
    if(!token) {
      alert("Please login again")
      navigate('/Login')
    }
    else{
      axios
        .post('http://localhost:3500/flashcard/verifytoken', { token: token })
        .then((response) => {
          console.log("Response is : ", response)
          if (response.data.message === 'tokenvalid') setIsUserLoggedIn(true);
          else {
            setIsUserLoggedIn(false);
            localStorage.clear();
            navigate('/Login');
          }
        })
        .catch((err) => {
          console.log("Errors is :" ,err);
          localStorage.clear();
          navigate('/Login');
          setIsUserLoggedIn(false);
        });
    }
  }, [localStorage.getItem('token')]);

  function handleLogout(){
    localStorage.clear();
    setIsUserLoggedIn(false)
    navigate('/Login'); // Move this line inside a useEffect to ensure it runs after the localStorage is cleared.
  };


  return (
    <nav className='navbar navbar-expand p-0 bg-secondary '>
      <div className='collapse navbar-collapse p-1'>
        <ul className='navbar-nav flex gap-2  ms-auto '>
        {/* {isUserLoggedIn &&( 
            <NavLink to='/' className='nav-link fw-bold text-white'>
              Home
            </NavLink>
        
        )} */}

          {/* profile show or not */}
          {isUserLoggedIn && (
         
              <NavLink to='/Widgets' className='nav-link fw-bold text-white'>
              Widgets
              </NavLink>
            
          )}

          {/* login or logout */}
          {isUserLoggedIn ? (
            <li className='nav-item btn border p-0'>
              <NavLink onClick={handleLogout} className='nav-link fw-bold text-white'>
                Logout
              </NavLink>
            </li>
          ) : (
            <>
                <NavLink to='/Login' className='nav-link fw-bold text-white'>
                  Login
                </NavLink>
              
                  <NavLink to='/signup' className='nav-link fw-bold text-white'>
                   Signup
                  </NavLink>
                </>
            
          )}
        </ul>
      </div>
    </nav>
  );
}



export default Navbarh