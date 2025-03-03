import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieApi";

const MovieSearch = () => {
  const [query, setQuery] = useState("");

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: query.length > 2, // Hanya fetch jika query lebih dari 2 karakter
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Cari film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {isError && <p className="text-red-500">Terjadi kesalahan!</p>}

      <div className="mt-4">
        {movies?.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} className="border-b p-2">
                {movie.title}
              </li>
            ))}
          </ul>
        ) : (
          query.length > 2 && <p className="text-gray-500">Tidak ada hasil</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;