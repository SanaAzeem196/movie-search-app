import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import './App.css';



function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
     const res = await fetch(`/api/omdb?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const res = await fetch(`/api/omdb?i=${imdbID}`);
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      setError('Could not load movie details.');
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search</h1>
      <SearchBar onSearch={searchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <MovieGrid movies={movies} onMovieClick={fetchMovieDetails} />
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;