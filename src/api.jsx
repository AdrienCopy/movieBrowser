const apiUrl = import.meta.env.VITE_API_URL;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const fetchGenres = async () => {
    const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${tmdbApiKey}&language=en-US`);
    const data = await response.json();
    return data.genres;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
    const response = await fetch(`${apiUrl}/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}&page=${page}`);
    const data = await response.json();
    return {
      movies: data.results || [],
      totalPages: data.total_pages || 1
  };
};

export const fetchMovies = async (query) => {
    const response = await fetch(`${apiUrl}/search/movie?api_key=${tmdbApiKey}&query=${query}`);
    const data = await response.json();
    return data.results;
};

export const fetchMovieTrending = async () => {
    const response = await fetch(`${apiUrl}/movie/popular?api_key=${tmdbApiKey}`);
    const data = await response.json();
    return data.results;
}

export const fetchMovieVideos = async (movieId) => {
    const response = await fetch(`${apiUrl}/movie/${movieId}/videos?api_key=${tmdbApiKey}`);
    const videoData = await response.json();
    return videoData.results;
};

export const fetchMovieDetail = async (id) => {
    const response = await fetch(`${apiUrl}/movie/${id}?api_key=${tmdbApiKey}&language=fr-FR`);
    const data = await response.json();
    return data;
}

export const fetchRequestToken = async () => {
    const response = await fetch(`${apiUrl}/authentication/token/new?api_key=${tmdbApiKey}`);
    const data = await response.json();
    return data.request_token;
  };

export const validateRequestToken = async (username, password, requestToken) => {
  const response = await fetch(`${apiUrl}/authentication/token/validate_with_login?api_key=${tmdbApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      request_token: requestToken,
    }),
  });
  const data = await response.json();
  return data.success;
};

export const createSession = async (requestToken) => {
    const response = await fetch(`${apiUrl}/authentication/session/new?api_key=${tmdbApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    });
    const data = await response.json();
    return data.session_id;
  };

export const fetchUserInfo = async (sessionId) => {
    const userInfoResponse = await fetch(`${apiUrl}/account?api_key=${tmdbApiKey}&session_id=${sessionId}`);
    const userInfo = await userInfoResponse.json();

    const favoriteMoviesResponse = await fetch(`${apiUrl}/account/${userInfo.id}/favorite/movies?api_key=${tmdbApiKey}&session_id=${sessionId}`);
    const favoriteMovies = await favoriteMoviesResponse.json();

    return {
        userInfo,
        favoriteMovies: favoriteMovies.results
  };
};

/*export const fetchAddFavorite = async (sessionId, accountId, movieId) => {
  const response = await fetch(`${apiUrl}/account/${accountId}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      favorite: true
    })
  });

  const data = await response.json();
  return data;
};*/

export const toggleFavorite = async (sessionId, userId, movieId, isFavorite) => {
  const response = await fetch(`${apiUrl}/account/${userId}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          favorite: !isFavorite,
      }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error('Failed to toggle favorite status');
  }

  return response.json();
};