import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * Komponen MovieSearch digunakan untuk melakukan pencarian film.
 * Menampilkan input pencarian dengan ikon search, serta menangani navigasi saat pencarian dilakukan.
 *
 * @param {string} query - Nilai input pencarian.
 * @param {function} setQuery - Fungsi untuk mengubah nilai input pencarian.
 */
const MovieSearch = ({ query, setQuery }) => {
  const location = useLocation(); // Hook untuk mendapatkan lokasi (URL) saat ini
  const navigate = useNavigate(); // Hook untuk navigasi antar halaman
  const [showSearch, setShowSearch] = useState(false); // State untuk menampilkan atau menyembunyikan input pencarian

  useEffect(() => {
    setShowSearch(false); // Tutup search saat pindah halaman
  }, [location.pathname]);

  /**
   * Menangani event saat tombol Enter ditekan.
   * Jika pengguna tidak berada di halaman utama ("/"), akan mengarahkan ke halaman utama.
   *
   * @param {KeyboardEvent} e - Event keyboard.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col items-center">
      {/* Tombol pencarian (hanya muncul di mode mobile) */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="md:hidden p-1 bg-indigo-500 text-white rounded-full shadow-md transition-all duration-300 hover:bg-indigo-800"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-200" />
      </button>

      {/* Input pencarian */}
      <div
        className={`absolute top-16 left-1/2 -translate-x-1/2 w-[90%] md:w-full transition-all duration-300 ${
          showSearch ? "block opacity-100" : "hidden opacity-0"
        } md:block md:relative md:opacity-100 md:top-0`}
      >
        {/* Ikon kaca pembesar di dalam input */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        </span>
        
        {/* Input text untuk pencarian film */}
        <input
          type="text"
          className="border p-2 pl-12 w-full rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 transition-all duration-200 hover:bg-white"
          placeholder="Search film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default MovieSearch;
