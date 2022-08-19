import axios from 'axios'

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




export default function Home() {
const [trendingMovies,setTrendingMovies]= useState([]);
 const [trendingTv,setTrendingTv]= useState([]);
 const [trendingPeople,setTrendingPeople]= useState([]);

 async function getTrending(media,callback){
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${media}/week?api_key=978e78abb24a4a96e6d401aad2542b97`);

callback(data.results.slice(0,10))
  }

  useEffect(() => {
  
    getTrending('movie',setTrendingMovies);
    getTrending('tv',setTrendingTv);
    getTrending('person',setTrendingPeople);
  }, []);

  return (
 <>
 {/* movies */}
 <div className="row">
  <div className="col-md-4 d-flex align-items-center ">
    <div >
    <div className="brdr w-25"></div>
     <h2 className='py-4 '>Trending <br/>Movies<br/>To Watch Now...</h2>
     <p className='text-muted'>most watched movies by day</p>
    <div className="brdr"></div>
    </div>
   
  </div>
{trendingMovies.map((movie,i)=><div key={i} className='col-md-2'>
<Link to={`/moviedetails/${movie.id}`}>
<div className='movie'>
  <img className='w-100 my-2' src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt='' />
  <h2 className='h5'>{movie.title}</h2>
</div>
</Link>

</div>)}
 </div>

 {/* tv shows  */}

 <div className="row my-4">
  <div className="col-md-4 d-flex align-items-center justifiy-content-center">
    <div >
    <div className="brdr w-25"></div>
     <h2 className='py-4 '>Trending <br/>Tv shows<br/>To Watch Now...</h2>
     <p className='text-muted '>most watched Tv shows by day</p>
    <div className="brdr"></div>
    </div>
   
  </div>
{trendingTv.map((tv,i)=><div key={i} className='col-md-2'>

<div className='tv'>
  <img className='w-100 my-2' src={'https://image.tmdb.org/t/p/w500'+ tv.poster_path} alt='' />
  <h2 className='h5'>{tv.name}</h2>
</div>

</div>)}


 </div>

{/* people */}
 <div className="row">
  <div className="col-md-4 d-flex align-items-center justifiy-content-center">
    <div >
    <div className="brdr w-25"></div>
     <h2 className='py-4 '>Trending <br/>people<br/>To Watch Now...</h2>
     <p className='text-muted'>most watched people by day</p>
    <div className="brdr"></div>
    </div>
   
  </div>
{trendingPeople.map((person,i)=><div key={i} className='col-md-2'>

<div className='person'>

  {person.profile_path===null?<img className='w-100'  src={require('../../nullphoto.png')} alt='' />:
  <img className='w-100 my-2' src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} alt='' />
  }
  
  <h2 className='h5'>{person.name}</h2>
</div>

</div>)}
 </div>
 </>
  )
}
