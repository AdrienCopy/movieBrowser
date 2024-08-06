import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieTrending, fetchMovieVideos } from "../api";

export default function Index() {
    const [movies, setMovies] = useState([]);
    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {
        const getMoviesAndVideo = async () => {
            try {
                const movies = await fetchMovieTrending();
                setMovies(movies);
    
                if (movies.length > 0) {
                    const randomMovieId = movies[Math.floor(Math.random() * movies.length)].id;
                    const videos = await fetchMovieVideos(randomMovieId);
    
                    if (videos.length > 0) {
                        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                        setVideoKey(randomVideo.key);
                    }
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        getMoviesAndVideo();
    }, []);

    return (
        <div className="container">
            <div className="movie-spotlight video-container">
            {videoKey ? (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Loading video...</p>
                )}
            </div>
            <div className="trending"><h2>Trending</h2></div>
            <section>
                {movies.map((movie, index) => (
                    <div key={movie.id} className={`movie-card ${index === 0 ? 'movie-card--first' : ''}`}>
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
    );
}
