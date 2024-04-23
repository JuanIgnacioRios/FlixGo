import React from 'react'
import './Movie.css'
import { Link } from 'react-router-dom'

const Movie = ({movie}) => {
 
  return (
    <div className='Movie-card'>
        <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" /></Link>
    </div>
  )
}

export default Movie