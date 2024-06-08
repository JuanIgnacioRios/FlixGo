import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar'
import BackButton from '../BackButton/BackButton'
import Toastify from 'toastify-js'
import Cookie from 'js-cookie'
import './MoviePage.css'

const MoviePage = () => {

    const [movieDetails, setMovieDetails] = useState([])
    const [user, setUser] = useState(null);

    let movieid = useParams()
    movieid = movieid.movieid

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      setUser(JSON.parse(storedUser))
    }, []);
    

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

    const showSuccessMessage = (message) => {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        style: {
          background: "#7ED957",
          color: "#26115"
        }
      }).showToast();
    };

    const showErrorMessage = (message) => {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        style: {
          background: "#FF0000",
          color: "#FFFFFF"
        }
      }).showToast();
  };

   async function handleCheckboxChangeWatchedList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"

    try {
        const response = await fetch(`http://localhost:8080/api/watchedlist/user/${user._id}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
        if(response.ok){
          const data = await response.json();
          const userToUpdate = JSON.parse(localStorage.getItem('user'))
          userToUpdate.watched_list = data.payload
          setUser(userToUpdate);
          localStorage.setItem('user', JSON.stringify(userToUpdate))
          checked ? 
          showSuccessMessage(`${movieDetails.title} agregado a lista Vistas`)
          :
          showErrorMessage(`${movieDetails.title} eliminado de lista Vistas`)
        }
   }catch(error){
        console.log(error)
   }}

   async function handleCheckboxChangeToWatchList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"
    try {
        const response = await fetch(`http://localhost:8080/api/towatchlist/user/${user._id}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
        if(response.ok){
          const data = await response.json();
          const userToUpdate = JSON.parse(localStorage.getItem('user'))
          userToUpdate.towatch_list = data.payload
          setUser(userToUpdate);
          localStorage.setItem('user', JSON.stringify(userToUpdate))
          checked ? 
          showSuccessMessage(`${movieDetails.title} agregado a lista Por Ver`)
          :
          showErrorMessage(`${movieDetails.title} eliminado de lista Por Ver`)
        }
   }catch(error){
        console.log(error)
   }}

   async function handleCheckboxChangeFavouriteList(event){
    const { checked } = event.target;
    const apiMethodChecked = "POST"
    const apiMethodUnchecked = "DELETE"
    try {
        const response = await fetch(`http://localhost:8080/api/favouritelist/user/${user._id}/movie/${movieid}`, {
          method: checked ? apiMethodChecked : apiMethodUnchecked,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('jwt')}`
          }
        });
        if(response.ok){
          const data = await response.json();
          const userToUpdate = JSON.parse(localStorage.getItem('user'))
          userToUpdate.favourite_list = data.payload
          setUser(userToUpdate);
          localStorage.setItem('user', JSON.stringify(userToUpdate))
          checked ? 
          showSuccessMessage(`${movieDetails.title} agregado a lista Favoritas`)
          :
          showErrorMessage(`${movieDetails.title} eliminado de lista Favoritas`)
        }
   }catch(error){
        console.log(error)
   }}


   if(!user){
    return <div>
      Cargando...
    </div>
   }


   console.log(user)
   console.log(user.watched_list)
   console.log(movieDetails.id)
   console.log(user.watched_list.includes(movieDetails.id) ? "TrUw" : "Fjdsk" )
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
                        <input type="checkbox" placeholder='Vista' onChange={handleCheckboxChangeWatchedList} checked={user.watched_list.includes(movieDetails.id) ? true : false}/>
                        <label htmlFor="">Vista</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Por Ver' onChange={handleCheckboxChangeToWatchList} checked={user.towatch_list.includes(movieDetails.id) ? true : false}/>
                        <label htmlFor="">Por Ver</label>
                    </div>
                    <div className='List-checkbox'>
                        <input type="checkbox" placeholder='Preferida' onChange={handleCheckboxChangeFavouriteList} checked={user.favourite_list.includes(movieDetails.id) ? true : false}  />
                        <label htmlFor="">Preferida</label>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default MoviePage