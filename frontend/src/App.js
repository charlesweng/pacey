import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Camera from "./Camera/Camera";
import Process from "./Process/Process";
import About from "./About/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/process" element={<Process />} />
      </Routes>
    </Router>
  );
}

export default App;
