import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Movies() {

  let num=new Array(5).fill(1).map((elem,index)=>index+1)
  const [trendingMovies,setTrendingMovies]= useState([]);
  async function getTrending(pageNumber){
    let {data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=978e78abb24a4a96e6d401aad2542b97&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    
    setTrendingMovies(data.results)
      }
    
      useEffect(() => {
      
        getTrending(1);
     
      }, []);


  return (
    <>
    {trendingMovies?<div className="row justify-content-center">
    {trendingMovies.map((movie,i)=><div key={i} className='col-md-2'>
    <Link to={`/moviedetails/${movie.id}`}>
    <div className='movie'>
      <img className='w-100 my-2' src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt='' />
      <h2 className='h5'>{movie.title}</h2>
    </div>
    </Link>
    
    </div>)}
     </div>:<div className='vh-100 d-flex align-items-center'><i className='text-center  fas fa-spinner fa-spin fa-3x'></i></div>}

   
     <nav aria-label="...">
  <ul className="pagination d-flex justify-content-center my-4">
    <li className="page-item disabled"><Link to={''} className="page-link text-white bg-transparent">Previous</Link>
    </li>

{num.map((pageNumber)=><li onClick={()=> getTrending(pageNumber)} key={pageNumber} className="page-item "><Link to={''} className="page-link text-white bg-transparent" >{pageNumber}</Link></li>)}
    

    <li className="page-item"> <Link to={''} className="page-link text-white bg-transparent">Next</Link>
    </li>
  </ul>
</nav>
   
     </>
   
  )
}
