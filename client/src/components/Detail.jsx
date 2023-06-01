import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../actions/index";
import { useEffect } from "react";
import "../styles/Detail.css";

const Detail = () => {
  const { idRaza } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDetail()); // Limpia el estado del detalle
    dispatch(getDetail(idRaza)); // Obtiene el detalle del perro
  }, [dispatch, idRaza]);

  const dogs = useSelector((state) => state.detail);

  if (!dogs) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="detailContainer">
        {dogs && (
          <>
            <h1>Name: {dogs.name}</h1>
            <img src={dogs.image && dogs.image.url} alt="" />
            <p>Life span: {dogs.life_span}</p>
            <p>Temperament: {dogs.temperament}</p>
            <p>Weight: {dogs.weight} kg</p>
            <p>Height: {dogs.height} cm</p>
          </>
        )}
        <Link to="/home">
          <button className="button">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
