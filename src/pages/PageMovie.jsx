import FilterMovie from "../components/ComponentFilterMovie";

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
      <FilterMovie Type={"Movies"} />
    </>
  );
};

export default PageMovie;
