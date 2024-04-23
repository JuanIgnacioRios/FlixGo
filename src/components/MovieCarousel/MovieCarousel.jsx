import React, { useState, useEffect, useRef } from 'react';
import Movie from '../Movie/Movie';
import './MovieCarousel.css';

const MovieCarousel = ({ code, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLeftVisible, setScrollLeftVisible] = useState(false);
  const [scrollRightVisible, setScrollRightVisible] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    setLoading(true); // Establecer loading a true al comenzar la carga de películas
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
          setLoading(false); // Establecer loading a false cuando las películas se carguen correctamente
        })
        .catch(err => console.log(err));
    }
  }, [code]);

  useEffect(() => {
    const handleScroll = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        const scrollLeft = carousel.scrollLeft;
        const scrollWidth = carousel.scrollWidth;
        const clientWidth = carousel.clientWidth;
        const isScrollableLeft = scrollLeft > 0;
        const isScrollableRight = scrollLeft < (scrollWidth - clientWidth);
        setScrollLeftVisible(isScrollableLeft);
        setScrollRightVisible(isScrollableRight);
      }
    };
    const checkVisibility = () => {
      if (movies.length > 0) {
        handleScroll();
      }
    };
    checkVisibility(); // Verificar visibilidad una vez que las películas estén cargadas
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [movies]);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -800,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 800,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar "Loading..." mientras se cargan las películas
  }

  return (
    <div className="movie-carousel">
      <h2>{title}</h2>
      <div className="carousel-container">
        {scrollLeftVisible && <button className="scroll-button left" onClick={handleScrollLeft}>{'<'}</button>}
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        {scrollRightVisible && <button className="scroll-button right" onClick={handleScrollRight}>{'>'}</button>}
      </div>
    </div>
  );
};

export default MovieCarousel;
