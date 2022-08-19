import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function People() {

  const [trendingPeople,setTrendingPeople]= useState([]);
  async function getTrending(){
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=978e78abb24a4a96e6d401aad2542b97`);
    
    setTrendingPeople(data.results)
      }
    
      useEffect(() => {
      
        getTrending();
     
      }, []);

  return (
    <>
    {trendingPeople?<div className="row justify-content-center">
    {trendingPeople.map((person,i)=><div key={i} className='col-md-2'>
    <Link to={`/moviedetails/${person.id}`}>
    <div className='movie'>
    {person.profile_path===null?<img className='w-100'  src={require('../../nullphoto.png')} alt='' />:
  <img className='w-100 my-2' src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} alt='' />
  }
      <h2 className='h5'>{person.name}</h2>
    </div>
    </Link>
    
    </div>)}
     </div>:<div className='vh-100 d-flex align-items-center'><i className='text-center  fas fa-spinner fa-spin fa-3x'></i></div>}
     </>
  )
}
