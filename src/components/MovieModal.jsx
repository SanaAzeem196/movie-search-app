function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const poster = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg';

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop if fallback also fails
    e.target.src = '/placeholder.jpg';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={poster} alt={movie.Title} className="modal-poster" onError={handleImageError} />
          <div className="modal-info">
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}/10</p>
            <p className="modal-plot">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;