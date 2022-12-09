import { Fragment, useState } from "react";
import MovieList from "./component/MoviesList";
import "./App.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  async function fetchMovieHandler() {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      const data = await response.json();

      const transferMovies = data.results.map((moviedata) => {
        return {
          id: moviedata.episode_id,
          title: moviedata.title,
          openingText: moviedata.opening_crawl,
          releaseDate: moviedata.relese_date,
        };
      });
      setMovies(transferMovies);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  return (
    <Fragment>
      <section className="section">
        <button onClick={fetchMovieHandler} className="button">
          fetch Movies
        </button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MovieList movies={movies} />}
        {!isloading && movies.length === 0 && <p>no movies found</p>}
        {isloading && <p>loading...</p>}
      </section>
    </Fragment>
  );
}
export default App;
