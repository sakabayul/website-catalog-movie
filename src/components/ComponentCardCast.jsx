import React from "react";
import useSearchQuery from "../services/useSearchQuery";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fetchMovieCredits } from "../services/movieApi";

const CardCast = ({ id }) => {
  const scrollRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  // Urutan Fungsi = queryKey, fetchFunction, query, bolean = true
  const {
    data: cast,
    isLoading: isLoadingCast,
    isError: isErrorCast,
  } = useSearchQuery("movieCredits", id, fetchMovieCredits);

  // Cek posisi scroll saat pertama kali dimuat & saat berubah
  React.useEffect(() => {
    const scrollContainer = scrollRef.current; // Simpan dalam variabel lokal
    const checkScroll = () => {
      if (scrollContainer) {
        setCanScrollLeft(scrollContainer.scrollLeft > 0);
        setCanScrollRight(
          scrollContainer.scrollLeft + scrollContainer.clientWidth <
            scrollContainer.scrollWidth
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
  }, [cast]); // Dependensi tetap sama

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600; // Jumlah scroll dalam px
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isErrorCast)
    return (
      <p className="text-gray-500 text-center w-full">Terjadi kesalahan!</p>
    );

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
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 p-2 snap-x snap-mandatory scrollbar-hide"
      >
        {isLoadingCast ? (
          <div className="flex space-x-4 p-2">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-32 flex-shrink-0 text-center bg-white p-2 rounded-lg shadow-md"
                >
                  <div className="animate-pulse bg-gray-500 rounded-lg w-32 h-40"></div>
                  <div className="mt-2 h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
          </div>
        ) : cast && cast.length > 0 ? (
          cast.slice(0, 10).map((actor) => (
            <div
              key={actor.id}
              className="w-32 flex-shrink-0 text-center snap-center bg-white p-2 rounded-lg shadow-md"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "images/unknown-image-default.webp"
                }
                alt={actor.name}
                className="rounded-lg object-cover w-32 h-40"
              />
              <p className="text-sm mt-2 font-medium">{actor.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cast available.</p>
        )}
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

export default CardCast;
