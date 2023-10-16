// Loader.js

import React from "react";
import "./Loader.css";

function Loader({ show }) {
  if (!show) return null;

  return (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
