//flashcards displaying component


import './Widgets.css';
import { useState,useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import {BiDotsVerticalRounded} from 'react-icons/bi'
import axios from 'axios'

// fetching the data from backend
function Widgets(){
    let [a,setData]=useState([]);
    let [c,setItem]=useState(0);
    let fetchData
    
// navigate variable
let navigate=useNavigate();

let del=async(userObj)=>{
  
    console.log("userobj"+userObj) 
      await axios.post("http://localhost:3500/flashcard/del",userObj)
      .then(message=>{
        console.log("mesage"+message)
        if(message==="deletion is done")
          window.location.reload();
          window.location.reload();
      })
      .catch(err=>{console.log("err"+err)});


}
    let location=useLocation();
    let userCredentials=location.state?.userData||{};
    console.log("user ligin credentials"+userCredentials.mail);
    
    fetchData = async () => {
      try {
      let token=localStorage.getItem('token')
      console.log("token at widjets is ::: "+token);
      const tokenresult=await axios.post('http://localhost:3500/flashcard/verifytoken',{token:token})
      console.log("token result in wedgets is  :: "+tokenresult.data.mail);
      if(tokenresult.data.message==='tokenvalid'){
      const response = await axios.get('http://localhost:3500/flashcard/get');
      console.log("RESPONSE IS :: ", response)
      const rdata = response.data.payload;
      // Do something with the data received from the API
      let actualdata=[];
      for(const value of rdata)
      {
        console.log("valid mail"+value.mail)
        if(value.mail===userCredentials.mail)
        actualdata.push(value);
        else{

        }
      }
      console.log("data is"+actualdata);
      setData(actualdata)
    }
    else{
      alert('login your account');
      localStorage.clear();
      navigate('/Login')
    }
    } catch (error) {
      // Handle error if the API request fails
      console.error("err ar 20"+error);
      alert('login your account');
      localStorage.clear();
      navigate('/Login')
    }
  };

  useEffect(() => {
      fetchData();
    },[]);
    //   console.log(data)
let update=async (dataitem)=>{

  try{
    console.log(dataitem)
    await axios.post("http://localhost:3500/flashcard/del",dataitem)
    // navigate('/')
  //  const response=await axios.post('http://localhost:3500/flashcard/put');
  //  console.log("response is"+response);
  navigate('/Register',{ state: { userData: userCredentials } })
  window.location.reload();
  }
  catch(error){
    console.log("error at update "+error.message);
  }
}


return(


    <div className='parent p-5'>
         <h1 className='container mx-5 text-primary'>FLASH CARDS</h1>
          {/* To add user */}
        <div className='btnn footer'>
       <button className='btn btn-primary border' onClick={()=>navigate('/Register',{ state: { userData: userCredentials } })}>
        + Add Card
       </button>
       </div>
         <div className='container child bg bg-white '>
         {/* Printing of entered data in grid of cards */}
        <div className=" row ">
            {a.map((dataObj,index)=>
            <div className="cols "key={index}>
                <div className="card ">
                    <div className="card-body ">
                    <h5 className='text-primary'>{dataObj.questions}</h5>
                    <h5 className='text-primary scroll '>{dataObj.answer}</h5>
                    <div className='d-flex justify-content-end'>
                      <button className='btn btn-primary' onClick={()=>del(dataObj)}>delete</button>
                      </div>
                      <div className='d-flex justify-content-end'>
                      <button className='btn btn-primary' onClick={()=>update(dataObj)}>update</button>
                      </div>
                    </div>
                </div>
            </div>
            )}
        </div>


       
    </div>
    </div>
)

}
export default Widgets;