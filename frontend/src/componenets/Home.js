import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react';


function Home() {
let {register,handleSubmit}=useForm();
let [data,setData]=useState("");
let submitForm=(obj)=>{
  setData(obj.number);
}

let useform=(obj1)=>{
  let n=obj1.target.value[obj1.target.value.length-1];
 console.log(n)

}
  return (
    <div className='container'>
      {/* url not to keep page empty */}
     <form onSubmit={handleSubmit(submitForm)}>
     <input type="text" id="question"  placeholder='Question' autoComplete='off' {...register("number")}/>
     <input type="text" id="question"  placeholder='Question' autoComplete='off' onChange={(obj1,i)=>obj1.target.value[obj1.target.value.length-1]}/>
     <button type='submit'>add</button>
     </form>
     <h1>{data}</h1>
    </div>
  )
}

export default Home