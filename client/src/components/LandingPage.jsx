import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  return (
    <div className="head">
      <h1>Welcome to Pink Dogs!</h1>
      <Link to="/home">
        <button className="button"> Into </button>
      </Link>
    </div>
  );
}
