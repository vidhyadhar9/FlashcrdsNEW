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
          setItem(c+1);
      })
      .catch(err=>{console.log("err"+err)});


}
    let location=useLocation();
    let userCredentials=location.state?.userData||{};
    let token=localStorage.getItem('token')
    useEffect(() => {
         fetchData = async () => {
          try {
            console.log("token at widjets"+token);
            const tokenresult=await axios.post('http://localhost:3500/flashcard/verifytoken',{token:token})
            console.log("token result"+tokenresult.data.message);
            if(tokenresult.data.message==='tokenvalid'){
            const response = await axios.get('http://localhost:3500/flashcard/get');
            
            const rdata = response.data.payload;
            // Do something with the data received from the API
            let actualdata=[];
            for(const value of rdata)
            {
              if(value.mail===userCredentials.mail)
              actualdata.push(value);
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
          }
        };
      
        fetchData();
      },[c]);
    //   console.log(data)



return(


    <div className='parent p-5'>
         <h1 className='container mx-5 text-primary'>FLASH CARDS</h1>
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
                    </div>
                </div>
            </div>
            )}
        </div>


        {/* To add user */}
       <div className='btnn footer'>
       <button className='btn btn-primary border' onClick={()=>navigate('/Register',{ state: { userData: userCredentials } })}>
        + Add Card
       </button>
       </div>
    </div>
    </div>
)

}
export default Widgets;