//flashcards displaying component


import './Widgets.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



// fetching the data from backend
function Widgets(){
    let [a,setData]=useState([]);
useEffect(()=>{
    fetch("http://localhost:3500/flashcard/get")//request to get the data and print in grid of cards
    .then((res)=>res.json())
    .then((a)=>setData(a))
    .catch((err)=>console.log("err is",err));
},[])


// navigate variable
let navigate=useNavigate();




return(


    <div className='parent '>
        <h1 className='container mx-5 text-primary'>FLASH CARDS</h1>
    <div className='container child bg bg-white '>
        {/* Printing of entered data in grid of cards */}
        <div className=" row row-cols-1 row-cols-sm-3 row-cols-lg-4">
            {a.map((dataObj,index)=>
            <div className="cols ">
                <div className="card  m-2">
                    <div className="card-body ">
                    <h5 className='text-primary'>{dataObj.questions}</h5>
                    <h5 className='text-primary'>{dataObj.answer}</h5>
                    
                    </div>
                </div>
            </div>
            )}
        </div>


        {/* To add user */}
       <div className='btnn footer'>
       <button className='btn btn-primary border' onClick={()=>navigate('/Register')}>
        + Add Card
       </button>
       </div>
    </div>
    </div>
)

}
export default Widgets;