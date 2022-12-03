import { useState, useCallback, useMemo } from "react";
import DemoList from "./component/Demo/DemoList";
import Button from "./component/UI/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");
  const [descending, setDesending] = useState([5, 3, 1, 10, 9]);
  const [btnText, setBtnText] = useState("descending order");

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const changeDesending = () => {
    let change = btnText;

    if (change === "descending order")
       {
         setBtnText("Ascending Order");
         const descendingSort = listItems.sort((a, b) => b - a);
         setDesending(descendingSort);
       }
    else
       {
         setBtnText("descending order");
         const assendingSort = listItems.sort((a, b) => a - b);
         setDesending(assendingSort);
       }
  };

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>change list Title</Button>
      <Button onClick={changeDesending}>{btnText}</Button>
    </div>
  );
}

export default App;
