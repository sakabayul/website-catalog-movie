import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Fetch movies using React Query
export const fetchSearchMovies = async (query) => {
  const response = await apiClient.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const fetchTrendingMovies = async (timeWindow) => {
  const response = await apiClient.get(`/trending/movie/${timeWindow}`);
  return response.data.results;
};

export const fetchPopularMovies = async () => {
  const response = await apiClient.get("/movie/popular");
  return response.data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await apiClient.get("/movie/top_rated");
  return response.data.results;
};

export const fetchFilteredMovies = async (filters) => {
  const { sortBy, genres, years, languages } = filters;
  const today = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
  const params = {
    api_key: API_KEY,
    language: "en-US",
    sort_by: sortBy || "popularity.desc",
    with_genres: genres?.length ? genres.join(",") : undefined,
    primary_release_year: years ? years : undefined,
    with_original_language: languages ? languages : undefined,
    "release_date.lte": today,
  };
  const response = await apiClient.get("/discover/movie", { params });

  return response.data.results;
};


export const fetchFilteredTVSeries = async (filters) => {
  const { sortBy, genres, years, languages } = filters;
  const today = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
  const params = {
    api_key: API_KEY,
    language: "en-US",
    sort_by: sortBy || "popularity.desc",
    with_genres: genres?.length ? genres.join(",") : undefined,
    first_air_date_year: years ? years : undefined,
    with_original_language: languages ? languages : undefined,
    "first_air_date.lte": today, // ⬅️ Filter hanya series yang sudah rilis
  };
  const response = await apiClient.get("/discover/tv", { params });

  return response.data.results;
};