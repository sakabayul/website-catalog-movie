const NODE_ENV = import.meta.env.VITE_NODE_ENV;

let apiModule;

if (NODE_ENV === "development") {
  apiModule = await import("./movieApiDevelopment");
} else {
  apiModule = await import("./movieApiProduction");
}

export const {
  fetchSearchFilm,
  fetchDetailsFilm,
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchFilmMedia,
  fetchGenres,
  fetchFilteredFilms,
  fetchFilmCast
} = apiModule;