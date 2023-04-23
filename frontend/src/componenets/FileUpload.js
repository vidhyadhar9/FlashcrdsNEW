
//component to upload files by posting data nad fetching it



import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';


function FileUpload() {


//usestaet hooks to render file and and images
const [file,setFile]=useState();
const [data,setImage]=useState([]);




const handleFile=(obj)=>{
    setFile(obj.target.files[0]);
}

const handleUpload=()=>{
    const formdata=new FormData();
    formdata.append('image',file);
    axios.post('http://localhost:3500/upload',formdata)
    .then(res=>{
        if(res.data.Status==="Success"){
            console.log("Succeded")
        }
        else{
            console.log("Failed")
        }
    })
    .catch(err=>console.log("error is ",err));
}


useEffect(()=>{
    axios.get("http://localhost:3500/flashcard/get")
    .then(res=>{

      setImage(res.data[0])
    })
    .catch(err=>{
      console.log("err is ",err);
    })
  },[])








  return (
    <div className='container'>
        <button className='btn m-3 p-0' onClick={handleUpload}><input type='file' onChange={handleFile}/></button> 
    </div >
  )
}

export default FileUpload