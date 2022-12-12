import { Fragment, useEffect, useState, useCallback } from "react";
import MovieList from "./component/MoviesList";
import "./App.css";
import AddMovies from "./AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopRetry, setStopRetry] = useState(true);


  const fetchMovieHandler = useCallback(async () => {
    //console.log("run");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fetch-movie-d556e-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();

      const loadedMovies =[]

      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);


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


   async function AddMoviesHandler(obj){
    console.log(obj)
    const response=await fetch ('https://fetch-movie-d556e-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(obj),
      Headers: {
        'Content-Type':'application/json'
      }
    })
    const data=await response.json()
    console.log(data)
   } 
  
  return (
    <Fragment>
      <section>
       <AddMovies onAddMovie={AddMoviesHandler}/>
      </section>
      <section className="section">
        <button onClick={fetchMovieHandler} className="button">
          fetch Movies
        </button>
        <button onClick={stopError}>Cancel</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MovieList movies={movies} onDel={fetchMovieHandler}/>}
        {!isloading && movies.length === 0 && !error && <p>no movies found</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>loading...</p>}
      </section>
    </Fragment>
  );
}
export default App;
