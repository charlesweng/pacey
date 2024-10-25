import React from "react";
import { useNavigate } from "react-router-dom";

function Process() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Process</h1>
      <button onClick={() => navigate("/camera")} className="button retake">
        Go to Camera
      </button>
    </div>
  );
}

export default Process;
