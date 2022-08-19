import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {
  let [user,setUser]=useState({
    first_name: '',
    last_name:'',
    age:'',
    password:'',
    email:''
  })


  let navigate=useNavigate();
  function gotoLogin(){
    navigate('/login')
  }
  function validateFormData(){
const schema =Joi.object({
  first_name: Joi.string().alphanum().min(3).max(10).required(),
  last_name:Joi.string().alphanum().min(3).max(10).required(),
  age:Joi.number().required().min(20).max(80),
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
    console.log(errorlist)

   }else{

    let {data}= await axios.post('https://routeegypt.herokuapp.com/signup',user);
    //console.log(data);
    if(data.message==='success'){
    gotoLogin()
    }
    else{
      setErrorMsg(data.message)
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
     
      <h1>Registration Form</h1>
      {errorlist.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
     {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:''}
      <div className="input-gb my-2">
      <label htmlFor='first_name'>First Name :</label>
      <input onChange={getFormData} type='text' className='form-control ' name='first_name'></input>
      </div>
      <div className="input-gb my-2">
      <label htmlFor='last_name'>Last Name :</label>
      <input onChange={getFormData} type='text' className='form-control ' name='last_name'></input>
      </div>
      <div className="input-gb my-2">
      <label htmlFor='age'>Age :</label>
      <input onChange={getFormData} type='number' className='form-control ' name='age'></input>
      </div>
      <div className="input-gb my-2">
      <label htmlFor='email'>Email :</label>
      <input onChange={getFormData} type='email' className='form-control ' name='email'></input>
      </div>
      <div className="input-gb my-2">
      <label htmlFor='password'>Password :</label>
      <input onChange={getFormData} type='password' className='form-control ' name='password'></input>
      </div>
     
     
      <button type='submit' className='btn btn-info d-flex ms-auto'>
        {loading?<i className='fas fa-spinner fa-spin'></i>:'Submit'}
      </button>
     
    </form>
    </div>
    </>
  )
}
