import FilterMovie from "../../components/filter/ComponentFilterFilm";

/**
 * Komponen `PageMovie` bertanggung jawab untuk menampilkan halaman daftar film.
 * Komponen ini hanya berisi `FilterMovie`, yang akan menangani pemfilteran dan
 * penampilan daftar film berdasarkan kriteria yang dipilih pengguna.
 *
 * @component
 * @returns {JSX.Element} Halaman daftar film dengan fitur filter.
 */
const PageMovie = () => {
  return (
    <>
      {/* Menampilkan komponen FilterMovie dengan properti Type yang diatur ke "Movies" */}
      <FilterMovie type={"movie"} />
    </>
  );
};

export default PageMovie;
