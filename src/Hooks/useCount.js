import { useState } from "react";

function useState(initialValue = 0, value) {
  const [count, setCount] = useState(i);

  const increment = () => {
    setCount(initialValue + value);
  };

  const decrement = () => {
    setCount(count - value);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return [count, increment, decrement, reset];
}

export default useCount;
