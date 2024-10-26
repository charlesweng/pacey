import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Process.css";

function Process() {
  const navigate = useNavigate();

  // Sample state to hold results
  const [results, setResults] = useState({
    impedance: [],
    implantDate: "",
    magnetBattery: "",
  });

  // Simulating data fetching from a backend
  useEffect(() => {
    // Replace with your actual data fetching logic
    const fetchData = async () => {
      // Simulating a delay to fetch data
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            impedance: ["12345", "67890", "23456"], // Example impedance values
            implantDate: "2024-10-25", // Example date
            magnetBattery: "ON", // Example magnet/battery status
          });
        }, 1000); // Simulating a 1 second delay
      });
      setResults(response);
    };

    fetchData();
  }, []);

  return (
    <div className="process-container">
      <h1>Results</h1>

      <div className="results">
        <h2>Impedance</h2>
        <ul>
          {results.impedance.map((imp, index) => (
            <li key={index}>{imp}</li> // Display each impedance value
          ))}
        </ul>
        <h2>Implant Date</h2>
        <p>{results.implantDate || "N/A"}</p> {/* Display implant date */}
        <h2>Magnet/Battery Status</h2>
        <p>{results.magnetBattery || "N/A"}</p> {/* Display status */}
      </div>

      <button onClick={() => navigate("/camera")} className="button retake">
        Camera
      </button>
    </div>
  );
}

export default Process;
