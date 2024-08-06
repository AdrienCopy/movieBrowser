import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../api';
import { Link } from "react-router-dom";
import BtnGenre from './BtnGenre';
import Pagination from './Pagination';

export default function MoviesByGenre () {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const MAX_PAGE = 500;

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
                const data = await fetchMoviesByGenre(selectedGenre, page);
                const validTotalPages = Math.min(data.totalPages, MAX_PAGE);
                    if (page > validTotalPages) {
                        setPage(validTotalPages); // Ajuster la page si elle dépasse le maximum
                    }
                setMovies(data.movies);
                setTotalPages(validTotalPages)
            };

            getMovies();
        }
    }, [selectedGenre, page]);

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
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
            
        </div>
    );
};

