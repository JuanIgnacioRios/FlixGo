import React from 'react';
import './Home.css';
import MovieCarousel from '../MovieCarousel/MovieCarousel';
import HomeCover from '../HomeCover/HomeCover';
import { useState, useEffect } from 'react';
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar';
import Cookies from 'js-cookie'

const Home = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
      }
    })
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
      })
      .catch(err => console.log(err));
  }, []);

  const jwtToken = Cookies.get('jwt');


  return (
    <div className="Home">
      <PrivateNavBar />
      <HomeCover />
      {genres.map(genre => (
        <MovieCarousel key={genre.id} code={genre.id} title={genre.name} />
      ))}
    </div>
  );
}


export default Home;
