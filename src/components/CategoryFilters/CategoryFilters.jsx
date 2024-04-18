// CategoryFilters.js
import React from 'react';
import './CategoryFilters.css'; // Make sure to create a CategoryFilters.css file for styling

const CategoryFilters = () => {
  return (
    <div className="category-filters">
      <button>Novedades</button>
      <button>Mi Lista</button>
      <button>Géneros</button>
    </div>
  );
}

export default CategoryFilters;
