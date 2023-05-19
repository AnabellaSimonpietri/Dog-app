import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, image, temperament, imperialWeight }) {
  return (
    <div>
      <Link to={`/dogs/${name}`}></Link>
      <img src={image} alt="" width={"300px"} />{" "}
      {/* Cambiar "image?.url" por "image" */}
      <h3>{name}</h3>
      <h5>{temperament}</h5>
      <h5>Weight: {imperialWeight} kg</h5>
    </div>
  );
}
