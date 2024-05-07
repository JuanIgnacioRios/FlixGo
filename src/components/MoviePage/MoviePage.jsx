import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'
import BackButton from '../BackButton/BackButton'
import './MoviePage.css'

const MoviePage = () => {

    const [movieDetails, setMovieDetails] = useState([])

    let movieid = useParams()
    movieid = movieid.movieid

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=es-ES`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
        }
        })
        .then(response => response.json())
        .then(data => {
            setMovieDetails(data);
        })
        .catch(err => console.log(err));
    }, []);


  return (
    <>
        <PrivateNavBar />
        <div className='movie-details'>
            <BackButton />
            <div className='movie-information'>
                <section>
                    <img src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt="" />
                </section>
                <section>
                    <h2>{movieDetails.title}</h2>
                    <hr />
                    <h5>{movieDetails.overview}</h5><br></br>
                    <h5>Puntaje: {movieDetails.vote_average}</h5>
                    <hr />
                    <h6>Agregá esta pelicula a tus listas:</h6>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Vista'/>
                        <label htmlFor="">Vista</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Por Ver'/>
                        <label htmlFor="">Por Ver</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Preferida'/>
                        <label htmlFor="">Preferida</label>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default MoviePage