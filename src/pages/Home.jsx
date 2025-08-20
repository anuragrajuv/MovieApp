import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies,getPopularMovies } from "../services/api";
import '../css/Home.css';

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to fetch popular movies.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, []);
 
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        setLoading(true);
        if (loading) return;
        try {
                const searchResults = await searchMovies(searchQuery);
                setMovies(searchResults);
                setError(null);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to fetch search results.");
            } finally{
                setLoading(false);
            }
        // setSearchQuery(""); // Clear the search input after submission
    }

    return (
        <div className="home">
            <form action="" onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for Movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}

            {loading? <div className="loading">loading...</div> : (
                <div className="movie-grid">
                    {movies.map(movie => 
                    (<MovieCard movie={movie} key={movie.id} />)
                    )}
                </div>
                )
            }
            
        </div>
    )
}

export default Home;