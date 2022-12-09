import { Fragment, useState } from "react";
import MovieList from "./component/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovieHandler() {
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
  }

  return (
    <Fragment>
      <section>
        <button onClick={fetchMovieHandler}>fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </Fragment>
  );
}
export default App;
