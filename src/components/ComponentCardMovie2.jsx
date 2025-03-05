import React from "react";
import { useNavigate } from "react-router-dom";

const CardMovie2 = ({ movies, isLoading, isError, query }) => {
  const navigate = useNavigate();

  const handleCardClick = (movie) => {
    navigate(`/about/${movie.id}`, { state: { movie } });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="relative bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg"
          >
            {/* Placeholder Image */}
            <div className="w-full aspect-[2/3] bg-gray-700 animate-pulse"></div>

            {/* Placeholder Info */}
            <div className="p-3">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-gray-500 text-center w-full">Terjadi kesalahan!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4">
      {movies?.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleCardClick(movie)}
            className="cursor-pointer relative group bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "images/unknown-image-default.webp"}
                alt={movie.title || movie.name || "Unknown Title"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 p-4 w-full bg-black/40 backdrop-blur-sm">
              <h2 className="text-lg font-semibold truncate">{movie.title || movie.name || "Unknown Title"}</h2>
              <p className="text-sm text-gray-400">{movie.release_date || movie.first_air_date || "Unknown Date"}</p>
            </div>
          </div>
        ))
      ) : (
        query?.length > 2 && <p className="text-gray-500 text-center w-full">Tidak ada hasil</p>
      )}
    </div>
  );
};

export default CardMovie2;
