import FilterMovie from "../components/ComponentFilterMovie";

/**
 * Komponen `PageTVShow` bertanggung jawab untuk menampilkan halaman daftar TV Shows.
 * Komponen ini memuat `FilterMovie`, yang akan menangani pemfilteran dan
 * penampilan daftar TV Shows berdasarkan kriteria yang dipilih pengguna.
 *
 * @component
 * @returns {JSX.Element} Halaman daftar TV Shows dengan fitur filter.
 */
const PageTVShow = () => {
  return (
    <>
      {/* Menampilkan komponen FilterMovie dengan properti Type yang diatur ke "TV Shows" */}
      <FilterMovie Type={"TV Shows"} />
    </>
  );
};

export default PageTVShow;
