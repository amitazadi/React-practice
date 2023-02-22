import { useState } from "react";

function Divcolorchange() {
  const [flag, setFlag] = useState("skyblue");

  const changeColor = () => {
    console.log(flag);

    if (flag === "skyblue") {
      setFlag("blue");
      return;
    }

    setFlag("skyblue");
  };

  return (
    <div className="App">
      <div style={{ backgroundColor: flag, height: "300px" }}></div>
      <button className="button" onClick={changeColor}>
        Click me
      </button>
    </div>
  );
}

export default Divcolorchange;
