// SearchBar.js
import React from 'react';
import './SearchBar.css'; // Make sure to create a SearchBar.css file for styling

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." />
      <span className="material-icons">search</span>
      <span className="material-icons">account_circle</span>
    </div>
  );
}

export default SearchBar;
