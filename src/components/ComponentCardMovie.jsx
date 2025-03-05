import React, { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const CardMovie = ({ movies, isLoading, isError, query }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Cek posisi scroll saat pertama kali dimuat & saat berubah
  useEffect(() => {
    const scrollContainer = scrollRef.current; // Simpan dalam variabel lokal
  
    const checkScroll = () => {
      if (scrollContainer) {
        setCanScrollLeft(scrollContainer.scrollLeft > 0);
        setCanScrollRight(
          scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth
        );
      }
    };
  
    if (scrollContainer) {
      checkScroll(); // Cek posisi awal
      scrollContainer.addEventListener("scroll", checkScroll);
    }
  
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
      }
    };
  }, [movies]); // Dependensi tetap sama

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600; // Jumlah scroll dalam px
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-800 rounded-lg overflow-hidden shadow-md min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px]">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <p className="text-gray-500 text-center w-full">Terjadi kesalahan!</p>;

  return (
    <div className="relative">
      {/* Tombol Scroll Kiri (Muncul hanya jika bisa scroll ke kiri) */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-900/60 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition hidden md:block"
        >
          <ChevronLeftIcon className="h-6 w-6 cursor-pointer" />
        </button>
      )}

      {/* Container Scroll */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide min-h-[350px] flex items-center">
        <div className="flex gap-6 px-4">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="group relative min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "images/unknow-image-default.webp"
                  }
                  alt={movie.title || "Unknown Title"}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-md font-semibold truncate">{movie.title || "Unknown Title"}</h3>
                  <p className="text-sm text-gray-400">
                    ⭐ {movie.vote_average.toFixed(1) || "N/A"} | 📅 {movie.release_date?.split("-")[0] || "Unknown"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            query?.length > 2 && <p className="text-gray-500 text-center w-full">Tidak ada hasil</p>
          )}
        </div>
      </div>

      {/* Tombol Scroll Kanan (Muncul hanya jika bisa scroll ke kanan) */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-900/60 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition hidden md:block"
        >
          <ChevronRightIcon className="h-6 w-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default CardMovie;
