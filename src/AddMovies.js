import { useState } from "react";
import classes from './AddMovies.module.css'
const AddMovies = (props) => {

  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const openingTextHandler = (e) => {
    setOpeningText(e.target.value);
  };

  const releaseDateHandler = (e) => {
    setReleaseDate(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();

    const obj = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
props.onAddMovie(obj)

setTitle('')
setOpeningText('')
setReleaseDate('')
   // console.log(obj);
  };

  return (
    <form onSubmit={formHandler} className={classes.control} >
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={title} onChange={titleHandler} />
      </div>
      <div>
        <label htmlFor="opening text">opening Text</label>
        <input
          id="opening text"
          type="text"
          value={openingText}
          onChange={openingTextHandler}
        />
      </div>
      <div>
        <label htmlFor="release date">release Date</label>
        <input
          id="release date"
          type="date"
          value={releaseDate}
          onChange={releaseDateHandler}
        />
      </div>
      <button type="submit">Add movie</button>
    </form>
  );
};

export default AddMovies;
