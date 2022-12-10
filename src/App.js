import { Fragment, useEffect, useState, useCallback } from "react";
import MovieList from "./component/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopRetry, setStopRetry] = useState(true);

const [title, setTitle]=useState('')
const [openingText, setOpeningText]=useState('')
const [releaseDate, setReleaseDate]=useState('')

  const fetchMovieHandler = useCallback(async () => {
    //console.log("run");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");

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
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, []);

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

  //form  
const titleHandler=(e)=>{
  setTitle(e.target.value)
}

const openingTextHandler=(e)=>{
  setOpeningText(e.target.value)
}

const releaseDateHandler=(e)=>{
  setReleaseDate(e.target.value)
}

const formHandler=(e)=>{
  e.preventDefault()

  const obj={title:title,
  openingText:openingText,
releaseDate:releaseDate}

console.log(obj)
}

  return (
    <Fragment>
      <section>
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="title" >Title</label>
            <input id="title" type="text" value={title} onChange={titleHandler}/>
          </div>
          <div>
            <label htmlFor="opening text" >opening Text</label>
            <input id="opening text" type="text"value={openingText} onChange={openingTextHandler} />
          </div>
          <div>
            <label htmlFor="release date">release Date</label>
            <input id="release date" type="date" value={releaseDate} onChange={releaseDateHandler}/>
          </div>
          <button type="submit">Add movie</button>
        </form>
      </section>
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
