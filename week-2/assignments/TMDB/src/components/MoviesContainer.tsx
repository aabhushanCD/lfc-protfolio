import MovieCard from "./MovieCard";

import type { Movie } from "../App";

const MoviesContainer = ({ movies }: { movies: Movie[] }) => {
  return (
    <>
      <div className="movie-container-header">
        <div className="movie-explore">
          <h1>Explore Cinema</h1>
          <p>
            Browse the most comprehensive database of films, curated by
            enthusiasts for the ultimate cinematic experience.
          </p>
        </div>
        <div className="movie-container-btms">
          <button>Top Rated</button>
          <button>Most Popular</button>
          <button>Upcoming</button>
        </div>
      </div>
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
    </>
  );
};

export default MoviesContainer;
