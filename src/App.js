import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Counter from "./components/Counter";
import Array from "./components/Array";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Array />} />
        <Route path="counter" element={<Counter />} />+
      </Routes>
    </BrowserRouter>
  );
}

export default App;
