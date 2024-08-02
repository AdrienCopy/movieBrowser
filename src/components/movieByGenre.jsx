import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../api';
import { Link } from "react-router-dom";
import BtnGenre from './BtnGenre';

export default function MoviesByGenre () {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            const genresList = await fetchGenres();
            setGenres(genresList);
        };

        getGenres();
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            const getMovies = async () => {
                const moviesList = await fetchMoviesByGenre(selectedGenre);
                setMovies(moviesList);
            };

            getMovies();
        }
    }, [selectedGenre]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    const getUnderlineIndices = (name) => {
        return [0, 1, 2];
    };

    return (
        <div>
            <div className="genre-links">
                {genres.map(genre => (
                    <BtnGenre 
                        key={genre.id} 
                        genre={genre} 
                        onClick={handleGenreClick} 
                        isActive={selectedGenre === genre.id} 
                        underlineIndices={getUnderlineIndices(genre.name)}
                    />
                ))}
            </div>
            <div className="movie-results">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-genre">
                    <Link to={`/movie/${movie.id}`}>
                        <figure>
                            <img className="imgPicture" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </figure>
                        <div className="movie-title">
                            <p>{movie.title}</p>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

