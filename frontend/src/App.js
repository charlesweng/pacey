import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CameraComponent from "./CameraComponent/CameraComponent";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Camera</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CameraComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
