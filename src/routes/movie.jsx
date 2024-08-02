import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail, fetchMovieVideos } from "../api";

export default function Movie() {
    const { id } = useParams(); // Récupère l'ID du film à partir de l'URL
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);

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
