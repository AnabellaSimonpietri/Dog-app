import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="head">
      <img
        src="https://static.vecteezy.com/system/resources/previews/015/097/267/original/pink-sweet-heart-png.png"
        alt="Heart"
        className="heart-image"
      />
      <h1>Welcome to Pink Dogs!</h1>
      {/* <div className="container">
        <p>
          This page invites you to meet the pink dogs of Fundación Amor. Dogs
          with love.
        </p>
      </div> */}
      <Link to="/home">
        <button className="button">Come on</button>
      </Link>
    </div>
  );
}
