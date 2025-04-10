import apiClient from "../services/request";

/**
 * Mengambil daftar film yang sedang trending.
 * @param {string} timeWindow - Rentang waktu, bisa "day" atau "week".
 * @returns {Promise<Array>} - Mengembalikan array film trending.
 */
export const fetchTrendingMovies = async (timeWindow = "day") => {
  try {
    const response = await apiClient.get(`/movies/movies-trending`, {
      params: { date: timeWindow }
    });

    return response.data.results;
  } catch (e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

/**
 * Mengambil daftar film populer.
 * @returns {Promise<Array>} - Mengembalikan array film populer.
 */
export const fetchPopularMovies = async () => {
  try {
    const response = await apiClient.get("/movies/movies-popular");

    return response.data.results;
  } catch (e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

/**
 * Mengambil daftar film dengan rating tertinggi.
 * @returns {Promise<Array>} - Mengembalikan array film dengan rating tertinggi.
 */
export const fetchTopRatedMovies = async () => {
  try {
    const response = await apiClient.get("/movies/movies-top_rated");
    
    return response.data.results;
  } catch (e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

/**
 * Mengambil daftar film berdasarkan kata kunci pencarian.
 * @param {string} query - Kata kunci pencarian.
 * @returns {Promise<Array>} - Mengembalikan array hasil pencarian.
 */
export const fetchSearchMovies  = async (query) => {
  try {
    // Request paralel untuk mendapatkan data movie dan TV shows
    const [movieResponse, tvResponse] = await Promise.all([
      apiClient.get("/search/movie", { params: { query } }),
      apiClient.get("/search/tv", { params: { query } }),
    ]);

    // Ambil hasil pencarian dari kedua response
    const movies = movieResponse.data.results.map(item => ({ ...item, type: "movie" }));
    const tvShows = tvResponse.data.results.map(item => ({ ...item, type: "tv" }));

    
    // Gabungkan hasil movie & TV show, lalu urutkan berdasarkan popularitas (desc)
    const combinedResults = [...movies, ...tvShows].sort((a, b) => b.vote_average - a.vote_average);

    return combinedResults;
  } catch (e) {
    console.error("Error fetching search data:", e.response?.status, e.message);
    return [];
  }
};