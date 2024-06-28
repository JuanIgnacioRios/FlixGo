import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar';
import BackButton from '../BackButton/BackButton';
import Toastify from 'toastify-js';
import Cookie from 'js-cookie';
import './MoviePage.css';

const MoviePage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [user, setUser] = useState(null);
  const [watched, setWatched] = useState(false);
  const [towatch, setToWatch] = useState(false);
  const [favourite, setFavourite] = useState(false);

  let { movieid } = useParams();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);

      if (user.watched_list.includes(movieid)) setWatched(true);
      if (user.towatch_list.includes(movieid)) setToWatch(true);
      if (user.favourite_list.includes(movieid)) setFavourite(true);
    }
  }, [movieid]);

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
  }, [movieid]);

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

  const handleCheckboxChangeWatchedList = async (event) => {
    const { checked } = event.target;
    const apiMethod = checked ? "POST" : "DELETE";

    try {
      const response = await fetch(`http://localhost:8080/api/watchedlist/user/${user._id}/movie/${movieid}`, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookie.get('jwt')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const userToUpdate = { ...user, watched_list: data.payload };
        setUser(userToUpdate);
        localStorage.setItem('user', JSON.stringify(userToUpdate));
        setWatched(checked);
        checked ? showSuccessMessage(`${movieDetails.title} agregado a lista Vistas`) : showErrorMessage(`${movieDetails.title} eliminado de lista Vistas`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChangeToWatchList = async (event) => {
    const { checked } = event.target;
    const apiMethod = checked ? "POST" : "DELETE";

    try {
      const response = await fetch(`http://localhost:8080/api/towatchlist/user/${user._id}/movie/${movieid}`, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookie.get('jwt')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const userToUpdate = { ...user, towatch_list: data.payload };
        setUser(userToUpdate);
        localStorage.setItem('user', JSON.stringify(userToUpdate));
        setToWatch(checked);
        checked ? showSuccessMessage(`${movieDetails.title} agregado a lista Por Ver`) : showErrorMessage(`${movieDetails.title} eliminado de lista Por Ver`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChangeFavouriteList = async (event) => {
    const { checked } = event.target;
    const apiMethod = checked ? "POST" : "DELETE";

    try {
      const response = await fetch(`http://localhost:8080/api/favouritelist/user/${user._id}/movie/${movieid}`, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookie.get('jwt')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const userToUpdate = { ...user, favourite_list: data.payload };
        setUser(userToUpdate);
        localStorage.setItem('user', JSON.stringify(userToUpdate));
        setFavourite(checked);
        checked ? showSuccessMessage(`${movieDetails.title} agregado a lista Favoritas`) : showErrorMessage(`${movieDetails.title} eliminado de lista Favoritas`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

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
            <h5>{movieDetails.overview}</h5><br />
            <div className='genres'>
              {movieDetails.genres && movieDetails.genres.map((genre) => {
                return <p key={genre.id} className='genre-button'>{genre.name}</p>;
              })}
            </div><br /><br />
            <h5>Puntaje: {movieDetails.vote_average}</h5>
            <hr />
            <h4>Agregá esta película a tus listas:</h4>
            <div className='List-checkbox'>
              <input type="checkbox" checked={watched} onChange={handleCheckboxChangeWatchedList} />
              <label>Vista</label>
            </div>
            <div className='List-checkbox'>
              <input type="checkbox" checked={towatch} onChange={handleCheckboxChangeToWatchList} />
              <label>Por Ver</label>
            </div>
            <div className='List-checkbox'>
              <input type="checkbox" checked={favourite} onChange={handleCheckboxChangeFavouriteList} />
              <label>Preferida</label>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
