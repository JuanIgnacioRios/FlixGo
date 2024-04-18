// MovieHighlight.js
import React from 'react';
import './MovieHighlight.css'; // Make sure to create a MovieHighlight.css file for styling

const MovieHighlight = () => {
  // Placeholder for the three movie highlights
  const highlights = [1, 2, 3]; // Replace with actual movie data

  return (
    <div className="movie-highlight">
      {highlights.map((highlight) => (
        <div key={highlight} className="highlight">
          {/* Replace with actual movie data */}
        </div>
      ))}
    </div>
  );
}

export default MovieHighlight;
