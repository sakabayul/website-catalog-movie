import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import MediaFilm from "../components/ComponentMediaFilm";
import CardCast from "../components/ComponentCardCast";
import { fetchGenres } from "../services/movieApi";

const PageAbout = () => {
  // Mengambil ID dari URL menggunakan useParams
  const { id } = useParams(); 
  const [genres, setGenres] = React.useState([]);
  const location = useLocation();
  
  // Mengambil data movie dari state yang dikirim melalui navigasi
  const movie = location.state.movie;
  
  // Membentuk objek produk dengan detail film yang akan ditampilkan
  const product = {
    id: id,
    name: movie.title || movie.name,
    genres: movie.genre_ids,
    overview: movie.overview,
    href: `#/about/${id}`,
    breadcrumbs: [
      { id: 1, name: "Home Page", href: "/" },
      { id: 2, name: movie.first_air_date ? "TV Series" : "Movies", href: movie.first_air_date ? "/tv-shows" : "/movie" },
    ],
    images: [
      {
        src: movie.poster_path,
        alt: movie.title,
      },
    ],
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date || movie.first_air_date,
    vote_average: movie.vote_average,
  };

  // Mengambil genre film berdasarkan ID-nya
  React.useEffect(() => {
    const getGenres = async () => {
      const Type = movie.first_air_date ? "tv" : "movie";
      const allGenres = await fetchGenres(Type);
      const matchedGenres = allGenres
        .filter((genre) => movie.genre_ids.includes(genre.id))
        .map((genre) => genre.name);

      setGenres(matchedGenres);
    };

    if (movie.genre_ids?.length > 0) {
      getGenres();
    }
  }, [movie]);

  return (
    <div className="bg-white">
      <div>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 py-3 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Background Image dengan Overlay */}
        <div className="relative w-full h-[450px] bg-gray-900 bg-cover bg-center" style={{
          backgroundImage: product.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${product.backdrop_path})`
            : "url(/images/unknown-backdrop.webp)",
        }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Detail Film */}
        <div className="mx-auto max-w-7xl px-8 md:grid md:grid-cols-3 md:gap-x-8 mt-[-150px] relative z-10">
          {/* Poster Film */}
          <img alt={product.images[0].alt} src={
            product.images[0].src
              ? `https://image.tmdb.org/t/p/w500${product.images[0].src}`
              : "/images/unknown-image-default.webp"
          } className="hidden size-full rounded-lg object-cover md:block" />
          
          {/* Informasi Film */}
          <div className="md:col-span-2 flex flex-col justify-center bg-white lg:bg-transparent p-6 rounded-lg shadow-lg lg:shadow-none">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name || "Unknown Title"}
            </h1>
            <p className="mt-2 text-gray-500">
              ⭐ {product.vote_average ? product.vote_average.toFixed(1) : "N/A"} |
              📅 {product?.release_date || "TBA"}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              {genres.length > 0 ? genres.join(", ") : "No genres available"}
            </p>
            <p className="mt-4 text-gray-700">
              {product?.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Bagian Tambahan: Pemeran dan Media */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mt-6">Top Billed Cast</h2>
          <CardCast id={id} />

          <h2 className="text-xl font-bold mt-6">Media</h2>
          <MediaFilm id={id} movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;