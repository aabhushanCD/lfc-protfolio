import MovieCard from "./MovieCard";

import type { Movie } from "../App";

const MoviesContainer = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="movies-container-grid">
      {movies?.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          imageLink={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
          date={movie.release_date}
          overview={movie.overview}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default MoviesContainer;
