import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Rootlayout from './componenets/Rootlayout';
import Mycalender from './componenets/Mycalender';
import Widgets from './componenets/Widgets';
import Home from './componenets/Home'
import Register from './componenets/Register';
import Signin from './componenets/Signin';
import Login from './componenets/Login';
import React, { useState } from 'react';


function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  const router=createBrowserRouter(
    [
      {
        path:'/',
        element:<Rootlayout/>,
        children:[
          {
            path:'/',
            element:<Mycalender/>
          },
          {
            path:'/signup',
            element:<Signin/>
          },
          {
            path:'/Mycalender',
            element:<Mycalender/>
          },
          {
            path:'/Widgets',
            element:<Widgets/>
          },{
            path:'/Register',
            element:<Register/>
          },
          {
            path:'/Login',
            element:<Login/>
          }
        ]
      }
    ]
  )
  return (
    <div className="App">
     <RouterProvider router={router}/>
     {/* <div className={`form-container ${showLogin ? 'show-login' : 'show-signup'}`}>
        {showLogin ? <Login /> : <Signin />}
        <p onClick={toggleForm} className="toggle-form">
          {showLogin ? 'Don\'t have an account? Sign up here.' : 'Already have an account? Login here.'}
        </p>
      </div> */}
    </div>
  );
}

export default App;
