import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail, fetchMovieVideos, toggleFavorite, fetchUserInfo } from "../api";
import { AuthContext } from "../components/AuthContext";
import BtnFavorite from "../components/BtnFavorite";
import heart from '../assets/picture/heart.svg';
import heartSolid from '../assets/picture/heart-solid.svg';

export default function Movie() {
    const { id } = useParams(); // Récupère l'ID du film à partir de l'URL
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const { sessionId, user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMovieDetail = async () => {
            const movieDetail = await fetchMovieDetail(id);
            setMovie(movieDetail);
        };
        getMovieDetail();
    }, [id]);

    useEffect(() => {
        const getMovieVideo = async () => {
            const videos = await fetchMovieVideos(id);
            setVideos(videos);
        }
        getMovieVideo();
    }, [id]);

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (sessionId && user) {
                const data = await fetchUserInfo(sessionId);
                const favoriteMovie = data.favoriteMovies.find(favMovie => favMovie.id === parseInt(id));
                setIsFavorite(!!favoriteMovie);
            }
        };
        checkIfFavorite();
    }, [sessionId, user, id]);

    const handleFavoriteToggle = async () => {
        setIsLoading(true);
        if (!sessionId || !user) {
            alert('You must be logged in to add favorites.');
            setIsLoading(false);
            return;
        }

        try {
            await toggleFavorite(sessionId, user.userInfo.id, id, isFavorite);
            setIsFavorite(!isFavorite);
            //alert(`Movie ${isFavorite ? 'removed from' : 'added to'} favorites!`);

        } catch (error) {
            console.error('Error toggling favorite movie:', error);
            alert('Failed to toggle movie favorite status.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const firstVideo = videos.length > 0 ? videos[0] : null;

    return (
        <div className="movie-details">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="detail">
                <div className="detail-row">
                    <p>{movie.runtime} minutes</p>
                    <p> &#9733; {movie.vote_average.toFixed(1)} (IMDb)</p>
                    {user && (
                    <button className="favorite" onClick={handleFavoriteToggle} disabled={isLoading}>
                        
                        {isLoading ? 'Loading...' : isFavorite ? <BtnFavorite src={heartSolid} className="heartSolid" /> : <BtnFavorite src={heart} className="heart" />}
                    </button>
                    )}
                </div>
                <h1>{movie.title}</h1>
                
                <hr />

                <div className="detail-row">
                    <div className="detail-50">
                        <h4>Date de sortie</h4>
                        <p className="gray">{movie.release_date}</p>
                    </div>
                    
                    <div className="detail-50">
                        <h4>Genre</h4>
                        <div className="detail-row"> 
                        {movie.genres && movie.genres.map((genre, index) => (
                            
                            <div key={index} className="genre" >
                                <p className="gray">{genre.name}</p>
                            </div>
                            
                        ))}
                        </div>
                    </div>
                </div>
                
                <hr />
                <div>
                    <h2>Synopsis</h2>
                    <p className="gray">{movie.overview ? movie.overview : "Synopsis non disponible"}</p>
                </div>
            </div>
            
            {firstVideo && (
                <div className="video-container movie-spotlight">
                    <h2>Watch Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${firstVideo.key}`}
                        title={firstVideo.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}


            <br />
            <br /><br /><br />
        </div>
    );
}
