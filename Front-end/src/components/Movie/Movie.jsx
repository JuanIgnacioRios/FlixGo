import React, { useEffect, useState } from 'react';
import './Movie.css';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  const [movieObject, setMovieObject] = useState(null);
  
  useEffect(() => {
    if (typeof movie === 'string') {
      fetch(`https://api.themoviedb.org/3/movie/${movie}?language=es-ES`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
        }
      })
      .then(response => response.json())
      .then(data => {
        setMovieObject(data);
      })
      .catch(err => console.log(err));
    } else {
      setMovieObject(movie);
    }
  }, [movie]);

  if (!movieObject) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Movie-card'>
      <Link to={`/movie/${movieObject.id}`}>
        <img src={`https://image.tmdb.org/t/p/original/${movieObject.poster_path}`} alt={movieObject.title} />
      </Link>
    </div>
  );
}

export default Movie;
