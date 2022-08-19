

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Networks from './components/Networks/Networks';
import Movies from './components/Movies/Movies';
import Tvshow from './components/Tvshow/Tvshow';
import About from './components/About/About';
import People from './components/People/People';
import {Navigate, Route,Routes, useNavigate} from 'react-router-dom';
import Notfound from './components/Notfound/Notfound';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import MovieDetails from './components/MovieDetails/MovieDetails';





function App() {
let [userInfo,setUserData]=useState(null)
  function getUserDataToken(){
   let encodedToken=localStorage.getItem('userToken');
   let decodedToken= jwtDecode(encodedToken);
   setUserData(decodedToken);
   console.log(decodedToken);
  }

//علشان الريفرش 
 useEffect(() => {
  if(localStorage.getItem('userToken')){
    getUserDataToken()
  }
 }
 , []);


let navigate=useNavigate();
 function logOut(){
  setUserData(null)
  localStorage.removeItem('userToken');
navigate('/login')
 }


 

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken') === null){
     return <Navigate to='/login'/>;
    }
    else{
      return props.children;
     }
  }
  return (
   <>
 <Navbar logout={logOut} userInfo={userInfo}/>

 <div className="container">
  <Routes>
    <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute> }></Route>
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
    <Route path='movies' element={<ProtectedRoute> <Movies/> </ProtectedRoute>}></Route>
    <Route path='tvshow' element={<ProtectedRoute><Tvshow/></ProtectedRoute> }>
    
    </Route>
    <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute> }></Route>
    <Route path='about' element={ <ProtectedRoute><About/></ProtectedRoute>}></Route>
    <Route path='moviedetails' element={ <ProtectedRoute><MovieDetails/></ProtectedRoute>}>
    <Route path=':id' element={ <ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
    </Route>
    <Route path='network' element={ <ProtectedRoute><Networks/></ProtectedRoute>}></Route>
    <Route path='*' element={<Notfound/>}></Route>
    <Route path='register' element={<Register/>} ></Route>
    <Route path='login' element={<Login getUserDataToken={getUserDataToken}/>} ></Route>
  </Routes>
 </div>
 
  </>
  );
}

export default App;
