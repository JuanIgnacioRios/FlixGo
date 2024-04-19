// App.js or your main component file
import React from 'react';
import './Home.css'; // Make sure to create an App.css file for styling
import SearchBar from '../SearchBar/SearchBar';
import MovieCarousel from '../MovieCarousel/MovieCarousel';
import CategoryFilters from '../CategoryFilters/CategoryFilters';
import { useState, useEffect } from 'react';

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



  return (
    <div className="Home">
      <SearchBar />
      <CategoryFilters />
      {genres.map(genre => (
      <MovieCarousel code={genre.id} title={genre.name} />
    ))}
    </div>
  );
}

export default Home;
