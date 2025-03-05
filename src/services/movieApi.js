import { apiClient } from "../api/filmApi";

// fungsi khusus untuk movie & TV series
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

// Fetch movies using React Query
export const fetchSearchMovies = async (query) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch(e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

export const fetchTrendingMovies = async (timeWindow) => {
  try {
    const response = await apiClient.get(`/trending/movie/${timeWindow}`);
    return response.data.results;
  } catch(e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await apiClient.get("/movie/popular");
    return response.data.results;
  } catch(e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await apiClient.get("/movie/top_rated");
    return response.data.results;
  } catch(e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

// Export fungsi khusus untuk movie & TV series
export const fetchFilteredMovies = (filters) => fetchFilteredData("movie", filters);
export const fetchFilteredTVSeries = (filters) => fetchFilteredData("tv", filters);

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data.cast; // Hanya mengembalikan daftar cast
  } catch(e) {
    console.error("Error fetching data:", e.response?.status, e.message);
    return [];
  }
};

export const fetchMovieMedia = async (movieId) => {
  try {
    const [imagesResponse, videosResponse] = await Promise.all([
      apiClient.get(`/movie/${movieId}/images`),
      apiClient.get(`/movie/${movieId}/videos`),
    ]);
    console.log("videosResponse:", videosResponse.data?.results);
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

export const fetchTvMedia = async (tvId) => {
  try {
    const [imagesResponse, videosResponse] = await Promise.all([
      apiClient.get(`/tv/${tvId}/images`),
      apiClient.get(`/tv/${tvId}/videos`),
    ]);
    console.log("videosResponse:", videosResponse.data?.results);
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

export const fetchGenres = async (type) => {
  try {
    const response = await apiClient.get(`/genre/${type}/list`);
    return response.data.genres; // Mengembalikan daftar genre
  } catch (error) {
    console.error(`Error fetching ${type} genres:`, error.response?.status, error.message);
    return [];
  }
};

