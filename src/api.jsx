const apiUrl = import.meta.env.VITE_API_URL;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const fetchGenres = async () => {
    const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${tmdbApiKey}&language=en-US`);
    const data = await response.json();
    return data.genres;
};

export const fetchMoviesByGenre = async (genreId) => {
    const response = await fetch(`${apiUrl}/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
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