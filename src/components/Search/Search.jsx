import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import Movie from '../Movie/Movie';
import PrivateNavBar from '../PrivateNavBar/PrivateNavBar';
import BackButton from '../BackButton/BackButton'

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchInput, setSearchInput] = useState("")

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

    useEffect(() => {
        if(selectedGenre){
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=${selectedGenre}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
                }
            })
            .then(response => response.json())
            .then(data => {
                setMovies(data.results); // Actualizar el estado de las películas con los resultados
            })
            .catch(err => console.log(err));
        }
    }, [selectedGenre]);

    useEffect(() => {
        if(searchInput){
            fetch(`https://api.themoviedb.org/3/search/multi?query=${searchInput}&include_adult=false&language=es-ES`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
                }
            })
            .then(response => response.json())
            .then(data => {
                setMovies(data.results); // Actualizar el estado de las películas con los resultados
            })
            .catch(err => console.log(err));
        }else{
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjMxNTRiZGI1NWMxNDQ0MzdiOTFhNmJhMjM5NmU0YSIsInN1YiI6IjY2MDM2YmZmMDkyOWY2MDE3ZTlmMTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OGO3nQusr7Cz0ivrOPAap5scW6QWAWFWI00Rbe2bHI'
                }
            })
            .then(response => response.json())
            .then(data => {
                setMovies(data.results); // Actualizar el estado de las películas con los resultados
            })
            .catch(err => console.log(err));
        }
    }, [searchInput]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId); // Actualizar el estado del género seleccionado al hacer clic en un enlace de género
    };

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const selectedGenreName = genres.find(genre => genre.id === selectedGenre)?.name;

    return (
        <div className='Search'>
            <PrivateNavBar />
            <BackButton />
            <div className="search-bar">
                <input type="text" placeholder="Buscá por titulo o por actor..." onChange={handleSearchInput}/>
            </div>
            <div className="category-filters">
                {genres.map(genre => (
                    <Link key={genre.id} to={`/search/genres/${genre.id}`} onClick={() => handleGenreClick(genre.id)}>{genre.name}</Link>
                ))}
            </div>
            <h3>{selectedGenreName}</h3>
            <div className="movie-grid">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
            </div>
        </div>
    );
};

export default Search;
