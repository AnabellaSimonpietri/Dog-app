import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  id,
  name,
  life_span,
  temperament,
  image,
  weight,
  height,
}) {
  return (
    <div>
      <Link to={`/detail/${id}`}></Link>
      <img src={image} alt="" width={"300px"} /> <h3>{name}</h3>
      <h5>Life Span: {life_span}</h5>
      <h5>Temperament: {temperament}</h5>
      <h5>Weight: {weight} kg</h5>
      <h5>Height: {height} cm</h5>
    </div>
  );
}
//*Cada propiedad tiene su paramero que le paso a Card//
