export async function handler(event, context) {
  const API_KEY = process.env.MY_SECRET_API_KEY; // stored in Netlify
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    let url = "";

    if (!event.queryStringParameters.query) {
      // popular movies
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    } else {
      // search
      const query = encodeURIComponent(event.queryStringParameters.query);
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const filteredMovies = data.results?.filter((movie) => !movie.adult) || [];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // 👈 allow all origins (for dev + GitHub Pages)
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(filteredMovies),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
