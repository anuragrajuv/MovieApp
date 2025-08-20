const API_BASE = "https://helpful-moxie-154501.netlify.app/.netlify/functions/fetchData";

export const getPopularMovies = async ()=>{3
    const response = await fetch(API_BASE);
    const data = await response.json();
    return data;
};


export const searchMovies = async (query)=>{
    const response = await fetch(`${API_BASE}?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
};