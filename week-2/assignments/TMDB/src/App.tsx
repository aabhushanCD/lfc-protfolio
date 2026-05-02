import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MoviesContainer from "./components/MoviesContainer";
import { useEffect, useState } from "react";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (): Promise<void> => {
    try {
      if (!search.trim()) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMovies = async (): Promise<void> => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMovies(data.results);
    };
    getMovies();
  }, []);
  return (
    <BrowserRouter>
      <Header
        search={search}
        handleSearch={handleSearch}
        setSearch={setSearch}
      />
      <MoviesContainer movies={movies} />
    </BrowserRouter>
  );
}
export default App;
