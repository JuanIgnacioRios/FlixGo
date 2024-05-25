import React, { useState, useEffect } from 'react'
import './HomeCover.css'

const HomeCover = () => {
    const [cover, setCover] = useState([])

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/trending/movie/day?language=es-ES', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
        }
      })
        .then(response => response.json())
        .then(data => {
            setCover(data.results[0]);
        })
        .catch(err => console.log(err));
    }, []);

  return (
    <div id='cover' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${cover.backdrop_path}')`}}>
      <div id='title-container'>
        <h1 className='cover-title green-font'>Flix</h1><h1 className='cover-title'>Go</h1>
      </div>
      <h1 id='subtitle-container'>DESCUBRÍ Y<br/>ORGANIZÁ<br/>LAS ÚLTIMAS PELÍCULAS DEL MOMENTO</h1>
    </div>
  )
}

export default HomeCover