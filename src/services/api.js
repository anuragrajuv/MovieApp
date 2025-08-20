const API_KEY = "d0176a573d8817da09656cf598a4c918";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async ()=>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};


export const searchMovies = async (query)=>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    const filteredMovies = await data.results.filter(movie => !movie.adult)
    console.log(filteredMovies)
    return filteredMovies;
};