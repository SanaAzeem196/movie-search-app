import MovieCard from './MovieCard';

function MovieGrid({ movies, onMovieClick }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}

export default MovieGrid;