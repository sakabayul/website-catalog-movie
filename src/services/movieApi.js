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
export const fetchMovies = async (query) => {
  const response = await apiClient.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};
