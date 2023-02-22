import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {count}
      <br />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          if (count <= 0) {
            setCount(0);
            return;
          }

          setCount(count - 1);
        }}
      >
        Decrement
      </button>
    </div>
  );
}

export default Counter;
