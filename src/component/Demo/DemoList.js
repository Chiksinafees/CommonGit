import { useMemo } from "react";

const DemoList = (props) => { // {title: 'My List', items: [5, 3, 1, 10, 9], descendingVal: false}
  console.log(props)
  const { items } = props;

  const sortedList = useMemo(() => {
    return items.sort((a, b) => a - b);
  }, [items]);

  // const sortedList = useMemo(() => {
  //   return items.sort((a, b) => b - a);
  // }, [items]);

  return (
    <div >
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
