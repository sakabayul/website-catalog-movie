import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MediaFilm from "../components/ComponentMediaFilm";
import CardCast from "../components/ComponentCardCast";

const PageAbout = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const location = useLocation();
  const movie = location.state.movie; // Ambil data movie dari state
  const product = {
    id: id,
    name: movie.title,
    genres: movie.genres,
    overview: movie.overview,
    href: `#/about/${id}`,
    breadcrumbs: [
      { id: 1, name: "Beranda", href: "/" },
      { id: 2, name: "Movie", href: "#/movie" },
    ],
    images: [
      {
        src: movie.poster_path,
        alt: movie.title,
      },
    ],
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };

  return (
    <div className="bg-white">
      <div>
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 py-3 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Backdrop Image dengan Overlay */}
        <div
          className="relative w-full h-[450px] bg-gray-900 bg-cover bg-center"
          style={{
            backgroundImage: product.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${product.backdrop_path})`
              : "url(/images/unknown-backdrop.webp)",
          }}
        >
          {/* Overlay Hitam untuk Kontras */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Informasi Movie */}
        <div className="mx-auto max-w-7xl px-8 md:grid md:grid-cols-3 md:gap-x-8 mt-[-150px] relative z-10">
          {/* Poster Film */}
          <img
            alt={product.images[0].alt}
            src={
              product.images[0].src
                ? `https://image.tmdb.org/t/p/w500${product.images[0].src}`
                : "/images/unknown-image-default.webp"
            }
            className="hidden size-full rounded-lg object-cover md:block"
          />
          {/* Deskripsi Movie */}
          <div className="md:col-span-2 flex flex-col justify-center bg-white lg:bg-transparent p-6 rounded-lg shadow-lg lg:shadow-none">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name || "Unknown Title"}
            </h1>

            {/* Rating & Tanggal Rilis */}
            <p className="mt-2 text-gray-500">
              ⭐{" "}
              {product.vote_average ? product.vote_average.toFixed(1) : "N/A"} |
              📅 {product?.release_date || "TBA"}
            </p>

            {/* Genre */}
            <p className="mt-2 text-sm text-gray-700">
              {product?.genres?.map((genre) => genre.name).join(", ") ||
                "No genres available"}
            </p>

            {/* Sinopsis */}
            <p className="mt-4 text-gray-700">
              {product?.overview || "No description available."}
            </p>

            {/* Tombol Tonton Trailer */}
            {product?.trailer_url && (
              <a
                href={product.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-indigo-600 px-4 py-2 text-white rounded-lg hover:bg-indigo-700"
              >
                Watch Trailer 🎬
              </a>
            )}
          </div>
        </div>

        {/* Container Utama */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Billed Cast Section */}
          <h2 className="text-xl font-bold mt-6">Top Billed Cast</h2>
          <CardCast id={id} />

          {/* Media Section */}
          <h2 className="text-xl font-bold mt-6">Media</h2>
          <MediaFilm id={id} />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
