import {
    HomeIcon,
    FilmIcon,
    TvIcon,
    InformationCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
  } from "@heroicons/react/24/solid";
  
  const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 🔹 Logo & Deskripsi */}
            <div>
              <h2 className="text-xl font-bold text-white">MovieApp</h2>
              <p className="mt-2 text-sm">
                Temukan film dan acara TV favoritmu dengan mudah.
              </p>
            </div>
  
            {/* 🔹 Navigasi */}
            <div>
              <h3 className="text-lg font-semibold text-white">Navigasi</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5 text-gray-400" />
                  <a href="/" className="hover:text-white">Beranda</a>
                </li>
                <li className="flex items-center gap-2">
                  <FilmIcon className="w-5 h-5 text-gray-400" />
                  <a href="/#movie" className="hover:text-white">Movie</a>
                </li>
                <li className="flex items-center gap-2">
                  <TvIcon className="w-5 h-5 text-gray-400" />
                  <a href="/#tv-shows" className="hover:text-white">TV Shows</a>
                </li>
                <li className="flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-gray-400" />
                  <a className="hover:text-white cursor-pointer">Tentang Kami</a>
                </li>
              </ul>
            </div>
  
            {/* 🔹 Kontak */}
            <div>
              <h3 className="text-lg font-semibold text-white">Kontak</h3>
              <p className="mt-2 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                support@movieapp.com
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                +62 812-3456-7890
              </p>
            </div>
  
            {/* 🔹 Media Sosial */}
            <div>
              <h3 className="text-lg font-semibold text-white">Ikuti Kami</h3>
              <div className="flex mt-2 space-x-4">
                <a className="hover:text-white flex items-center gap-2 cursor-pointer">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  Website
                </a>
              </div>
            </div>
  
          </div>
  
          {/* 🔹 Garis Pembatas */}
          <hr className="border-gray-700 my-6" />
  
          {/* 🔹 Copyright */}
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} MovieApp | Design by: Saka Bayu.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  