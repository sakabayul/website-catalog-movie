/**
 * Footer Component
 * 
 * Komponen ini menampilkan footer untuk aplikasi MovieApp.
 * Footer mencakup beberapa bagian:
 * - Navigasi ke halaman utama, film, acara TV, dan tentang kami
 * - Informasi kontak
 * - Link ke media sosial
 * - Hak cipta di bagian bawah
 * 
 * Menggunakan Tailwind CSS untuk styling dan React Router untuk navigasi.
 */

import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";

/**
 * Komponen Footer
 * @returns {JSX.Element} Footer aplikasi
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Deskripsi */}
          <div>
            <h2 className="text-xl font-bold text-white">MovieApp</h2>
            <p className="mt-2 text-sm">
              Find your favorite movies and TV shows easily.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-gray-400" />
                <Link to="/" className="hover:text-white">Home Page</Link>
              </li>
              <li className="flex items-center gap-2">
                <FilmIcon className="w-5 h-5 text-gray-400" />
                <Link to="/movie" className="hover:text-white">Movies</Link>
              </li>
              <li className="flex items-center gap-2">
                <TvIcon className="w-5 h-5 text-gray-400" />
                <Link to="/tv-shows" className="hover:text-white">TV Shows</Link>
              </li>
              <li className="flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5 text-gray-400" />
                <Link className="hover:text-white cursor-pointer">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="mt-2 flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              support@movieapp.com
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              +62 812-3456-7890
            </p>
          </div>

          {/* Media Sosial */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex mt-2 space-x-4">
              <Link className="hover:text-white flex items-center gap-2 cursor-pointer">
                <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                Website
              </Link>
            </div>
          </div>

        </div>

        {/* Garis Pembatas */}
        <hr className="border-gray-700 my-6" />

        {/* Copyright */}
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} MovieApp | Design by: Saka Bayu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;