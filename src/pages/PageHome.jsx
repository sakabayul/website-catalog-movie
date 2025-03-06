import { useState } from "react";
import CardMovie from "../components/ComponentCardMovie";
import CardMovie2 from "../components/ComponentCardMovie2";
import {
  fetchSearchMovies,
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies, // Fetch untuk film dengan rating tertinggi
} from "../services/movieApi";
import useSearchQuery from "../services/useSearchQuery";

const PageHome = ({ query }) => {
  const [timeWindow, setTimeWindow] = useState("day"); // State untuk memilih trending berdasarkan hari atau minggu

  /**
   * Mengambil data film berdasarkan pencarian user.
   * Query hanya dijalankan jika panjang `query` lebih dari 2 karakter.
   */
  const {
    data: movies,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchQuery("movies", query, fetchSearchMovies, query.length > 2);

  /**
   * Mengambil data film trending (harian/mingguan).
   */
  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useSearchQuery("trendingMovies", timeWindow, fetchTrendingMovies);

  /**
   * Mengambil data film paling populer.
   */
  const {
    data: popularMovies,
    isLoading: popularLoading,
    isError: popularError,
  } = useSearchQuery("popularMovies", "", fetchPopularMovies);

  /**
   * Mengambil data film dengan rating tertinggi.
   */
  const {
    data: topRatedMovies,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useSearchQuery("topRatedMovies", "", fetchTopRatedMovies);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Jika user melakukan pencarian */}
      {query?.length > 2 ? (
        <>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-10">
            Search Movies
          </h2>
          <CardMovie2
            movies={movies}
            isLoading={searchLoading}
            isError={searchError}
            query={query}
          />
        </>
      ) : (
        <>
          {/* Bagian untuk film trending */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-10">
            Trending Movies
          </h2>
          <div className="flex justify-center gap-4 my-6">
            {/* Tombol untuk memilih trending hari ini atau minggu ini */}
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                timeWindow === "day"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                timeWindow === "week"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </button>
          </div>
          <CardMovie
            movies={trendingMovies}
            isLoading={trendingLoading}
            isError={trendingError}
          />

          {/* Bagian untuk film populer */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-10">
            Popular Movies
          </h2>
          <CardMovie
            movies={popularMovies}
            isLoading={popularLoading}
            isError={popularError}
          />

          {/* Bagian untuk film dengan rating tertinggi */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-10">
            Top Rated Movies
          </h2>
          <CardMovie
            movies={topRatedMovies}
            isLoading={topRatedLoading}
            isError={topRatedError}
          />
        </>
      )}
    </div>
  );
};

export default PageHome;
