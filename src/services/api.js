// const API_KEY = "d0176a573d8817da09656cf598a4c918";
// const BASE_URL = "https://api.themoviedb.org/3";

const API_BASE = "https://helpful-moxie-154501.netlify.app/.netlify/functions/fetchData";

export const getPopularMovies = async ()=>{
    const response = await fetch(API_BASE);
    const data = await response.json();
    return data.results;
};


export const searchMovies = async (query)=>{
    const response = await fetch(`${API_BASE}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    const filteredMovies = await data.results.filter(movie => !movie.adult)
    console.log(filteredMovies)
    return filteredMovies;
};