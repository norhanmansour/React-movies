import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Login(props) {
  let [user,setUser]=useState({
    password:'',
    email:''
  })


  let navigate=useNavigate();
  function gotoHome(){
    navigate('/home')
  }
  function validateFormData(){
const schema =Joi.object({
 
  email:Joi.string().required().email({tlds:{allow:['net','com']}}) ,
  password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
});
return schema.validate(user,{abortEarly:false})
  }


  let [errorMsg,setErrorMsg]=useState('');
  let [errorlist,seterrorList]=useState([]);
  let [loading,setloading]=useState(false);
  async function  submitForm(e){
    e.preventDefault();
    setloading(true)
    let validateResponse=validateFormData();
   if(validateResponse.error){
    seterrorList(validateResponse.error.details)
    //console.log(errorlist)

   }else{

    let {data}= await axios.post('https://sticky-note-fe.vercel.app/signin',user);
    console.log(data);
    if(data.message==='success'){
      localStorage.setItem('userToken',data.token);
      props.getUserDataToken();
      gotoHome()
    }
    else{
      setErrorMsg(data.message);
    }

   }
   setloading(false)
  }


  function getFormData(e){
    let userData={...user};  //deep copy
    userData[e.target.name]=e.target.value;
    setUser(userData);
    console.log(user);
  }
  return (
    <>
     <div className='my-4 bg-dark p-3 w-75 m-auto'>
    <form onSubmit={submitForm}>
     
      <h1>Login Form</h1>
      {errorlist.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
     {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:''}
      
      <div className="input-gb my-2">
      <label htmlFor='email'>Email :</label>
      <input onChange={getFormData} type='email' className='form-control ' name='email'></input>
      </div>
      <div className="input-gb my-2">
      <label htmlFor='password'>Password :</label>
      <input onChange={getFormData} type='password' className='form-control ' name='password'></input>
      </div>
     
     
      <button type='submit' className='btn btn-info d-flex ms-auto'>
        {loading?<i className='fa fa-spinner fa-spin'></i>:'Submit'}
      </button>
     
    </form>
    </div>
    </>
  )
}

