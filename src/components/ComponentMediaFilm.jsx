import React from "react";
import { fetchMovieMedia } from "../services/movieApi";
import useSearchQuery from "../services/useSearchQuery";

const MediaFilm = ({ id }) => {
  const categories = ["Most Popular", "Videos", "Backdrops", "Posters"];
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("Most Popular");

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Jika layar < 640px (Mobile)
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Urutan Fungsi = queryKey, query, fetchFunction, bolean = true
  const {
    data: media,
    isLoading: isLoadingMedia,
    isError: isErrorMedia,
  } = useSearchQuery("movieMedia", id, fetchMovieMedia);
  if (isLoadingMedia) return <p className="text-gray-500 text-center w-full">Loading...</p>;
  if (isErrorMedia) return <p className="text-gray-500 text-center w-full">Terjadi kesalahan!</p>;

  return (
    <>
      <div className="mt-4">
        {/* Tabs */}
        {isMobile ? (
          // Mobile: Gunakan Select Option
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700 cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          // Desktop: Gunakan Buttons
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Konten Berdasarkan Tab */}
      <div className="mt-4">
        {activeCategory === "Most Popular" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ...(media?.backdrops?.slice(0, 4) || []),
              ...(media?.posters?.slice(0, 4) || []),
            ].map((image, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt="Popular Media"
                className="rounded-lg object-cover w-full h-40"
              />
            ))}
          </div>
        )}

        {activeCategory === "Videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {media.videos.length > 0 ? (
              media.videos
                .slice(0, 4)
                .map((video) => (
                  <iframe
                    key={video.id}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    className="w-full h-56 rounded-lg shadow-lg"
                    allowFullScreen
                  />
                ))
            ) : (
              <p className="text-gray-500">No trailers available.</p>
            )}
          </div>
        )}

        {activeCategory === "Backdrops" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {media?.backdrops?.length > 0 ? (
              media.backdrops
                .slice(0, 8)
                .map((image, index) => (
                  <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="Backdrop"
                    className="rounded-lg object-cover w-full h-40 shadow-md"
                  />
                ))
            ) : (
              <p className="text-gray-500">No backdrops available.</p>
            )}
          </div>
        )}

        {activeCategory === "Posters" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {media.posters.length > 0 ? (
              media.posters
                .slice(0, 8)
                .map((image, index) => (
                  <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="Poster"
                    className="rounded-lg object-cover w-full h-40 shadow-md"
                  />
                ))
            ) : (
              <p className="text-gray-500">No posters available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MediaFilm;
