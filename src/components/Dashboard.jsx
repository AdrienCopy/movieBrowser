import React, { useEffect, useState, useContext }  from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { fetchUserInfo } from '../api';
import Source from './source';

const Dashboard = () => {
  const { sessionId, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getUserInfoAndFavorites = async () => {
      try {
        const data = await fetchUserInfo(sessionId);
        setUser(data.userInfo);
        setFavorites(data.favoriteMovies);
      } catch (error) {
        console.error('Error fetching user info and favorite movies:', error);
      }
    };

    if (sessionId) {
      getUserInfoAndFavorites();
    }
  }, [sessionId]);

  if (!user) {
    return <p>Loading...</p>;
  }


  return (
    <div className='profil'>
      <div className='detail'>
      <h1>Welcome, {user ? user.name : 'User'}</h1>
      <br />
      </div>
      
      
      <div >
        <h2 className='detail'>Your Favorite Movies</h2>
            {favorites.length > 0 ? (
                <section>
                  
                    {favorites.map(movie => (
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
            ) : (
                <p>You have no favorite movies.</p>
            )}
      </div>
      <div className='detail'>
        <h2>Info</h2>
        <p>Session ID : {user ? user.username : 'Loading...'}</p>
        <p>Pays : {user ? user.iso_3166_1 : 'Loading...'}</p> 
        <p>Langue : {user ? user.iso_639_1 : 'Loading...'}</p>
        <p>ID : {user ? user.id : 'Loading...'}</p>
        <br />
        <button onClick={logout}>Logout</button>
      </div>
      <Source />       
    </div>
  );
};

export default Dashboard;
