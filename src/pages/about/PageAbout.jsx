import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import MediaFilm from "../../components/media/ComponentMediaFilm";
import CardCast from "../../components/cast/ComponentCardCast";
import pageAbout from "./page-about";

const PageAbout = () => {
  // Mengambil ID dari URL menggunakan useParams
  const { id } = useParams(); 
  const type = useLocation().state.film.title? "movie" : "tv";
  const [movies, setMovies] = React.useState({
    detailsFilm: [],
    product: []
  });
  
  const fetchData = React.useCallback(async () => {
    try {
      const rslt = await pageAbout(id, type);
      if (rslt.ret === 0) {
        setMovies({
          detailsFilm: rslt.detailsFilm,
          product : rslt.product
        });
      } else {
        console.warn("Message:", rslt.msg);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  }, [id, type]);
  
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  // Membentuk objek produk dengan detail film yang akan ditampilkan
  const film = movies.product;

  return (
    <div className="bg-white">
      <div>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 py-3 sm:px-6 lg:max-w-7xl lg:px-8">
            {(film?.breadcrumbs || []).map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={film.href} aria-current="page" className="block truncate font-medium text-gray-900
             max-w-[140px] sm:max-w-[250px]">
                {film.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Background Image dengan Overlay */}
        <div className="relative w-full h-[450px] bg-gray-900 bg-cover bg-center mb-10" style={{
          backgroundImage: film.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`
            : "url(images/unknown-image-default.webp)"
        }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Detail Film */}
        <div className="mx-auto max-w-7xl px-8 md:grid md:grid-cols-3 md:gap-x-8 mt-[-150px] relative z-10">
          {/* Poster Film */}
          <img alt={film.images?.[0]?.alt} src={
            film.images?.[0]?.src
              ? `https://image.tmdb.org/t/p/w500${film.images?.[0]?.src}`
              : "images/unknown-image-default.webp"
          } className="hidden size-full rounded-lg object-cover md:block" />
          
          {/* Informasi Film */}
          <div className="md:col-span-2 flex flex-col justify-center bg-white lg:bg-transparent p-6 rounded-lg shadow-lg lg:shadow-none">
            <h1 className="text-3xl font-bold text-gray-900">
              {film?.name || "Unknown Title"}
            </h1>
            <p className="mt-2 text-gray-500">
              ⭐ {film.vote_average ? film.vote_average.toFixed(1) : "N/A"} |
              📅 {film?.release_date || "TBA"}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              {(film?.genres || []).length > 0 ? (
                film.genres.map((genre, index) => (
                  <span key={genre.id || index}>
                    {genre.name}
                    {index < film.genres.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </p>
            <p className="mt-4 text-gray-700">
              {film?.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Bagian Tambahan: Pemeran dan Media */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mt-6">Top Billed Cast</h2>
          <CardCast id={id} type={type} />

          <h2 className="text-xl font-bold mt-6">Media</h2>
          <MediaFilm id={id} type={type} />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;