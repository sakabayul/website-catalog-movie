import apiClient from "../services/request";

export function fetchFilmCast(data) {
  return apiClient({
    url: `/${data.type}/${data.id}/credits`,
    method: "get",
    params: data,
  });
}

export function fetchFilteredFilms(data) {
  return apiClient({
    url: `/discover/${data.type}`,
    method: "get",
    params: data,
  });
}

export function fetchDetailsFilm(data) {
  return apiClient({
    url: `/${data.type}/${data.id}`,
    method: "get",
    params: data,
  });
}

export function fetchSearchFilm(data) {
  return apiClient({
    url: `/search/${data.type}`,
    method: "get",
    params: data,
  });
}

export function fetchTrendingMovies(data) {
  return apiClient({
    url: `/trending/movie/${data.time_window}`,
    method: "get",
    params: data,
  });
}

export function fetchPopularMovies(data) {
  return apiClient({
    url: "/movie/popular",
    method: "get",
    params: data,
  });
}

export function fetchTopRatedMovies(data) {
  return apiClient({
    url: "/movie/top_rated",
    method: "get",
    params: data,
  });
}

export function fetchFilmMedia(data) {
  return apiClient({
    url: `/${data.type}/${data.id}/${data.type_media}`,
    method: "get",
    params: data,
  });
}

export function fetchGenres(data) {
  return apiClient({
    url: `/genre/${data.type}/list`,
    method: "get",
    params: data,
  });
}