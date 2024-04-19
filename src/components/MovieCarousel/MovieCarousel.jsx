import React, { useState, useEffect, useRef } from 'react';
import Movie from '../Movie/Movie'
import './MovieCarousel.css'; // Asegúrate de crear un archivo MovieCarousel.css para el estilo

const MovieCarousel = ({ code = "No code", title }) => {
  const [movies, setMovies] = useState([])
  const carouselRef = useRef(null);

  useEffect(() => {
    if (code !== "No code") {
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=${code}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
        }
      })
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
        })
        .catch(err => console.log(err));
    }
  }, [code]);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -184.5, // Ajusta el valor según la cantidad de desplazamiento que desees
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 184.5, // Ajusta el valor según la cantidad de desplazamiento que desees
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="movie-carousel">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button className="scroll-button left" onClick={handleScrollLeft}>{'<'}</button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-button right" onClick={handleScrollRight}>{'>'}</button>
      </div>
    </div>
  );
}

export default MovieCarousel;
