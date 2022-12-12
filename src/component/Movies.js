import classes from "./Movies.module.css";

const Movies = (props) => {

  async function deleteHandler() {
  
  //  console.log(props);
    try {
      const del = await fetch(
        `https://fetch-movie-d556e-default-rtdb.firebaseio.com/movies/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!del.ok) {
        const msg = "error in deleting" + del.status;
        throw new Error(msg);
      }
        const data = await del.json();
        console.log(data);
       } catch (err) {}
    props.onDel();
  }

  return (
    <li className={classes.movies}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler}>delete</button>
    </li>
  );
};

export default Movies;
