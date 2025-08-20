// netlify/functions/fetchData.js
export async function handler(event, context) {
  const API_KEY = process.env.MY_SECRET_API_KEY; // stored in Netlify env vars
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    let url = "";

    // If no query params, return popular movies
    if (!event.queryStringParameters.query) {
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    } else {
      // If query param exists, perform search
      const query = encodeURIComponent(event.queryStringParameters.query);
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    }

    // Call TMDB API
    const response = await fetch(url);
    const data = await response.json();

    // Filter adult content
    const filteredMovies = data.results?.filter(movie => !movie.adult) || [];

    return {
      statusCode: 200,
      body: JSON.stringify(filteredMovies),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
