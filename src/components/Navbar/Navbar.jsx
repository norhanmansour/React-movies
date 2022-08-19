import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

export default function Navbar(props) {
  return (
    
    <nav className={`${styles.bgcolor} navbar navbar-expand-lg navbar-light`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to='home'>NOXE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
      {props.userInfo?<>
        <li className="nav-item">
          <Link className="nav-link" to='home'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='movies'>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='tvshow'>TV Show</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='people'>People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='about'>About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='network'>Networks</Link>
        </li>
      </>:''}
      </ul>
     

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <div className="social-media  d-flex align-items-center">
        <i className="mx-1 fab fa-facebook"></i>
        <i className="mx-1 fab fa-spotify"></i>
        <i className="mx-1 fab fa-twitter"></i>
        <i className="mx-1 fab fa-youtube"></i>
      </div>
{props.userInfo?<>
        <li className="nav-item">
         <span onClick={props.logout} className="nav-link text-white" >Sign Out</span>
        </li></> :<>
        <li className="nav-item">
         <Link className="nav-link" to='login'>Login</Link>
        </li>
       <li className="nav-item">
         <Link className="nav-link" to='register'>Register</Link>
       </li>
</>}
      
      
     </ul>
     
    </div>
  </div>
</nav>
    
  )
}
