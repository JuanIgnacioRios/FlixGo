import React from 'react'
import './Movie.css'

const Movie = ({movie}) => {
 
  return (
    <div className='Movie-card'>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
    </div>
  )
}

export default Movie