import MoviesByGenre from "../components/movieByGenre";
import MovieSearch from "../components/movieSearch";

export default function Search () {
    return (
        <div>
            <MovieSearch />
            <MoviesByGenre />
        </div>      
    )
}