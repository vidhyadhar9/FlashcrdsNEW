import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Rootlayout from './componenets/Rootlayout';
import Mycalender from './componenets/Mycalender';
import Widgets from './componenets/Widgets';
import Home from './componenets/Home'
import Register from './componenets/Register';

function App() {

  const router=createBrowserRouter(
    [
      {
        path:'/',
        element:<Rootlayout/>,
        children:[
          {
            path:'/',
            element:<Home/>
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
          }
        ]
      }
    ]
  )
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
