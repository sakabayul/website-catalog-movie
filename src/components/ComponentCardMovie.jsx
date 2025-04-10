import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

/**
 * Komponen CardMovie untuk menampilkan daftar film dalam bentuk kartu
 * dengan fitur scroll horizontal dan navigasi ke halaman detail film.
 * 
 * @param {Object} props - Properti komponen
 * @param {Array} props.movies - Daftar film yang akan ditampilkan
 * @param {boolean} props.isLoading - Status loading saat mengambil data film
 * @param {boolean} props.isError - Status error jika terjadi kesalahan saat fetching
 * @param {string} props.query - Query pencarian film (jika ada)
 */
const CardMovie = ({ movies, isLoading, isError, query }) => {
  const scrollRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const navigate = useNavigate();

  // Cek posisi scroll saat pertama kali dimuat & saat berubah
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
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
  }, [movies]);

  /**
   * Fungsi untuk menggulir daftar film ke kiri atau kanan
   * @param {"left" | "right"} direction - Arah scroll
   */
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600; // Jumlah scroll dalam px
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /**
   * Fungsi untuk menangani klik pada kartu film
   * @param {Object} movie - Data film yang diklik
   */
  const handleCardClick = (film) => {
    if (film.title) {
      navigate(`/movie/${film.id}`, { state: { film } });
    } else {
      navigate(`/tv/${film.id}`, { state: { film } });
    }
  };

  // Jika sedang loading, tampilkan placeholder animasi
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

  // Jika terjadi error saat mengambil data
  if (isError) return <p className="text-gray-500 text-center w-full">Terjadi kesalahan!</p>;

  return (
    <div className="relative">
      {/* Tombol Scroll Kiri */}
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
                onClick={() => handleCardClick(movie)}
                className="cursor-pointer group relative min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
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
                <div className="p-3 w-60">
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

      {/* Tombol Scroll Kanan */}
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