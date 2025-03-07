import { apiClient } from "../services/request";

/**
 * Mengambil daftar pemeran dari sebuah film berdasarkan ID dan Type film.
 * @param {number} id - ID film.
 * @returns {Promise<Array>} - Mengembalikan array daftar pemeran.
 */
const castCredits = async (id, type) => {
  try {
    // Pastikan type hanya bisa "movie" atau "tv"
    if (type !== "movie" && type !== "tv") {
      throw new Error("Invalid type. Must be 'movie' or 'tv'.");
    }

    // Request API berdasarkan tipe (Movie atau TV Show)
    const response = await apiClient.get(`/${type}/${id}/credits`);

    return response.data.cast; // Mengembalikan hanya daftar cast
  } catch (e) {
    console.error("Error fetching credits:", e.response?.status, e.message);
    return [];
  }
};
export const fetchMovieCast = (id) => castCredits(id, "movie");
export const fetchTvCast = (id) => castCredits(id, "tv");

/**
 * Mengambil data film atau TV series berdasarkan filter yang diberikan.
 * @param {string} type - Jenis konten, bisa "movie" atau "tv".
 * @param {Object} filters - Filter untuk pencarian, termasuk sorting, genre, tahun, dan bahasa.
 * @returns {Promise<Array>} - Mengembalikan array hasil pencarian.
 */
const fetchFilteredData = async (type, filters) => {
  try {
    const { sortBy = "popularity.desc", genres, years, languages } = filters;
    const today = new Date().toISOString().split("T")[0];

    const params = {
      sort_by: sortBy,
      with_genres: genres?.length ? genres.join(",") : undefined,
      with_original_language: languages || undefined,
      "release_date.lte": type === "movie" ? today : undefined,
      "first_air_date.lte": type === "tv" ? today : undefined,
      primary_release_year: type === "movie" ? years || undefined : undefined,
      first_air_date_year: type === "tv" ? years || undefined : undefined,
    };

    const response = await apiClient.get(`/discover/${type}`, { params });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error.response?.status, error.message);
    return [];
  }
};
export const fetchFilteredMovies = (filters) => fetchFilteredData("movie", filters);
export const fetchFilteredTVSeries = (filters) => fetchFilteredData("tv", filters);

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

/**
 * Mengambil daftar film yang sedang trending.
 * @param {string} timeWindow - Rentang waktu, bisa "day" atau "week".
 * @returns {Promise<Array>} - Mengembalikan array film trending.
 */
export const fetchTrendingMovies = async (timeWindow) => {
  try {
    const response = await apiClient.get(`/trending/movie/${timeWindow}`);
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
    const response = await apiClient.get("/movie/popular");
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
    const response = await apiClient.get("/movie/top_rated");
    return response.data.results;
  } catch (e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

/**
 * Mengambil gambar dan trailer dari sebuah film berdasarkan ID film.
 * @param {number} movieId - ID film.
 * @returns {Promise<Object>} - Mengembalikan objek yang berisi backdrops, posters, dan videos.
 */
export const fetchMovieMedia = async (movieId) => {
  try {
    const [imagesResponse, videosResponse] = await Promise.all([
      apiClient.get(`/movie/${movieId}/images`),
      apiClient.get(`/movie/${movieId}/videos`),
    ]);
    const trailers = videosResponse.data?.results?.filter(
      (video) => video.type === "Trailer"
    ) || [];

    return {
      backdrops: imagesResponse.data?.backdrops || [],
      posters: imagesResponse.data?.posters || [],
      videos: trailers,
    };
  } catch (e) {
    console.error("Error fetching movie data:", e.response?.status, e.message);
    return { backdrops: [], posters: [], videos: [] };
  }
};

/**
 * Mengambil gambar dan trailer dari sebuah TV series berdasarkan ID TV.
 * @param {number} tvId - ID TV series.
 * @returns {Promise<Object>} - Mengembalikan objek yang berisi backdrops, posters, dan videos.
 */
export const fetchTvMedia = async (tvId) => {
  try {
    const [imagesResponse, videosResponse] = await Promise.all([
      apiClient.get(`/tv/${tvId}/images`),
      apiClient.get(`/tv/${tvId}/videos`),
    ]);
    const trailers = videosResponse.data?.results?.filter(
      (video) => video.type === "Trailer"
    ) || [];

    return {
      backdrops: imagesResponse.data?.backdrops || [],
      posters: imagesResponse.data?.posters || [],
      videos: trailers,
    };
  } catch (e) {
    console.error("Error fetching TV data:", e.response?.status, e.message);
    return { backdrops: [], posters: [], videos: [] };
  }
};

/**
 * Mengambil daftar genre untuk film atau TV series.
 * @param {string} type - Jenis konten, bisa "movie" atau "tv".
 * @returns {Promise<Array>} - Mengembalikan array daftar genre.
 */
export const fetchGenres = async (type) => {
  try {
    const response = await apiClient.get(`/genre/${type}/list`);
    return response.data.genres; // Mengembalikan daftar genre
  } catch (error) {
    console.error(`Error fetching ${type} genres:`, error.response?.status, error.message);
    return [];
  }
};
