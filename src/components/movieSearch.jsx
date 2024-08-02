import { Form, Link } from "react-router-dom";
import React, { useState } from 'react';
import { fetchMovies } from "../api"
import Glass from '../assets/picture/glass-search.svg';
import BtnSearch from "./BtnSearch";

export default function MovieSearch () {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (query.trim() === '') return;

        const results = await fetchMovies(query);
        setMovies(results);
    };

    return (
        <div>
            <Form id="movie-search" onSubmit={handleSubmit} role="search">
              <BtnSearch glass={Glass} />
             <input
                type="text"
                value={query}
                onChange={handleChange}
                className="input-search"
                placeholder="Search for a movie..."  
            />
            </Form>
            <section>
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`}>
                            <figure><img className="imgPicture" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></figure>
                            <div className="movie-vote-average">
                                <h2>IMDb</h2>
                                <p><span style={{ color: '#ffff00' }}>&#9733;</span> {movie.vote_average.toFixed(1)} </p>
                            </div>
                            <div className="movie-info">
                                <h2>{movie.title}</h2>
                                <p>{movie.release_date.split('-')[0]}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </div>
        
    )
}