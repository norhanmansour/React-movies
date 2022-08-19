import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function MovieDetails() {
    let params=useParams();
    let [movieDetails,setMovieDetails]=useState(null);

   async function getMovieDetails(id){
     let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=978e78abb24a4a96e6d401aad2542b97&language=en-US`)
     setMovieDetails(data)
    };
     useEffect(() => {
    getMovieDetails(params.id)
     },[])

  
    
  return (
    <>
{movieDetails? 
 <div className="row">
        <div className="col-md-3">
     <div>
       <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+movieDetails.poster_path} alt=''  />
     </div>
        </div>
    <div className="col-md-9 d-flex align-items-center ">
        <div>
        <h2> Title : {movieDetails.title}</h2>
        <h4>popularity : {movieDetails.popularity}</h4>
        <h4>URL : {movieDetails.homepage}</h4>
        <p className='text-muted '>{movieDetails.overview}</p>
        </div>
        
    </div>
    </div>:<div className='vh-100 d-flex align-items-center'><i className='texxt-center  fas fa-spinner fa-spin fa-3x'></i></div>}
  
   
    
    </>
  )
}
