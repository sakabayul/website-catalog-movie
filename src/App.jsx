import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/ComponentNavigationBar';
import PageHome from './pages/PageHome';
import PageMovie from './pages/PageMovie';
import PageTVShow from './pages/PageTVShow';
import PageAbout from './pages/PageAbout';
import Footer from './components/ComponentFooter';

const App = () => {
  const [query, setQuery] = React.useState("");

  return (
    <Router>
      <NavigationBar query={query} setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<PageHome query={query} setQuery={setQuery} />} />
        <Route path="/movie" element={<PageMovie />} />
        <Route path="/tv-shows" element={<PageTVShow />} />
        <Route path="/about/:id" element={<PageAbout />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;