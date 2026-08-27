function MovieCard({ movie, onClick }) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png';

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop if placeholder also fails
    e.target.src = '/placeholder.jpg';
  };

  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <img src={poster} alt={movie.Title} onError={handleImageError} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

export default MovieCard;