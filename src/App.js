import { Fragment, useState } from "react";
import MovieList from "./component/MoviesList";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopRetry, setStopRetry] = useState(true);

  async function fetchMovieHandler() {

    console.log("run");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.py4e.com/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

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
        } 
         catch (error) {
            setError(error.message);
            }

    setIsLoading(false);
  }

  if (error) {
     if (stopRetry) {
        setTimeout(() => {
           fetchMovieHandler();
            }, 5000);
           }
         }
 
  const stopError = () => {
    //console.log('stop')
    setStopRetry(false);
  };

  return (
    <Fragment>
      <section className="section">
        <button onClick={fetchMovieHandler} className="button">
          fetch Movies
        </button>
        <button onClick={stopError}>Cancel</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MovieList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>no movies found</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>loading...</p>}
      </section>
    </Fragment>
  );
}
export default App;
