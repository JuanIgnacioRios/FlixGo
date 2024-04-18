// App.js or your main component file
import React from 'react';
import './Home.css'; // Make sure to create an App.css file for styling
import SearchBar from '../SearchBar/SearchBar';
import MovieHighlight from '../MovieCarousel/MovieCarousel';
import MovieCarousel from '../MovieHighlight/MovieHighlight';
import CategoryFilters from '../CategoryFilters/CategoryFilters';

const Home = () => {
  return (
    <div className="Home">
      <SearchBar />
      <CategoryFilters />
      <MovieHighlight />
      <MovieCarousel title="Continuar viendo" />
      <MovieCarousel title="Nuevos lanzamientos" />
      <MovieCarousel title="Aclamadas por la crítica" />
    </div>
  );
}

export default Home;
