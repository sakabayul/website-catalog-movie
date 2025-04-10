import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/ComponentNavigationBar';
import PageHome from './pages/home/PageHome';
import PageMovie from './pages/movie/PageMovie';
import PageTVShow from './pages/tv/PageTVShow';
import PageAbout from './pages/about/PageAbout';
import Footer from './components/ComponentFooter';

/**
 * Komponen utama aplikasi yang menangani routing dan state global.
 * Menggunakan React Router untuk navigasi antar halaman.
 */
const App = () => {
  // State untuk menyimpan query pencarian
  const [query, setQuery] = React.useState("");

  return (
    // Menggunakan HashRouter untuk menangani navigasi berbasis hash (#)
    <Router>
      {/* Navigasi utama, menerima query untuk pencarian */}
      <NavigationBar query={query} setQuery={setQuery} />

      {/* Definisi rute aplikasi */}
      <Routes>
        {/* Halaman utama, menampilkan daftar film berdasarkan query */}
        <Route path="/" element={<PageHome query={query} setQuery={setQuery} />} />
        
        {/* Halaman untuk menampilkan daftar film */}
        <Route path="/movie" element={<PageMovie />} />
        
        {/* Halaman untuk menampilkan daftar TV Shows */}
        <Route path="/tv" element={<PageTVShow />} />
        
        {/* Halaman About yang menerima parameter dinamis `id` */}
        <Route path="/movie/:id" element={<PageAbout />} />
        <Route path="/tv/:id" element={<PageAbout />} />
      </Routes>

      {/* Footer yang muncul di semua halaman */}
      <Footer />
    </Router>
  );
};

export default App;
