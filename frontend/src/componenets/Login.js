import React from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './Login.css'

function Login() {
  const [data,setData]=useState("");
  // const [role,setRole]=useState("")

  let {register,handleSubmit}=useForm();

  let navigate=useNavigate();

  let Submitfun = async(userdata)=>{

    //   setRole(userdata.role)
    // console.log(role)
    // console.log('User Data is:'+userdata.role);
  
    axios.post(`http://localhost:3500/flashcards/login`,userdata)
    .then((res)=>{
      console.log(res.data);
     if(res.data.message!=="valid account"){
      setData("* enter valid details");
     }
     else{
      localStorage.setItem('token',res.data.token)
      navigate('/Widgets',{ state: { userData: userdata } });
     }
    console.log("results "+res.data);
    })
    .catch(err=>console.log("err at posting :",err.message));
  }

  return ( 
    <div className="row vh-100">
   <div className='d-flex justify-content-center  col-5 '>
   
    <form action="" className='' onSubmit={handleSubmit(Submitfun)}>
    
      <div className="row ms-3">
        <div className="col-auto">
          <div className="mb-1">
            <div className='m-3  '> 
            <h2>Login</h2>
            <input      className="form-label text-success"
            type="email" 
            name="" id="" 
            placeholder='email' 
            {...register('mail',{required:true})}
            />
            </div>
            <div className='m-3'>
              <input className="form-label text-success"
              type="password" 
              name="password" 
              id="password" 
              placeholder='password' 
              {...register('password',{required:true})}
              />
            </div>
            <button className='btn btn-success p-1 ' type='Submit'>submit</button>
            <h3 className='caution'>{data}</h3>
           </div>
          </div>
       </div>
       
       </form>
  
</div>

</div>
  )
}

export default Login