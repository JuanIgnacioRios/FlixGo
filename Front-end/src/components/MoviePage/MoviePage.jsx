import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'
import BackButton from '../BackButton/BackButton'
import Cookie from 'js-cookie'
import './MoviePage.css'

const MoviePage = () => {

    const [movieDetails, setMovieDetails] = useState([])

    let movieid = useParams()
    movieid = movieid.movieid

    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id

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

   async function handleCheckboxChangeWatchedList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"

    try {
        const response = await fetch(`http://localhost:8080/api/watchedlist/user/${userid}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
   }catch(error){
        console.log(error)
   }}

   async function handleCheckboxChangeToWatchList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"
    try {
        const response = await fetch(`http://localhost:8080/api/towatchlist/user/${userid}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
   }catch(error){
        console.log(error)
   }}

   async function handleCheckboxChangeFavouriteList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"
    try {
        const response = await fetch(`http://localhost:8080/api/favouritelist/user/${userid}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
   }catch(error){
        console.log(error)
   }}


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
                    <div className='genres'>
                        {movieDetails.genres && movieDetails.genres.map((genre) => {
                            return <p key={genre.id} className='genre-button'>{genre.name}</p>;
                        })}
                    </div><br></br><br></br>
                    <h5>Puntaje: {movieDetails.vote_average}</h5>
                    <hr />
                    <h6>Agregá esta pelicula a tus listas:</h6>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Vista' onChange={handleCheckboxChangeWatchedList}/>
                        <label htmlFor="">Vista</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Por Ver' onChange={handleCheckboxChangeToWatchList}/>
                        <label htmlFor="">Por Ver</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Preferida' onChange={handleCheckboxChangeFavouriteList} />
                        <label htmlFor="">Preferida</label>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default MoviePage