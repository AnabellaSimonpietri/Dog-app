import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import "../styles/Detail.css";

const Detail = () => {
  const { idRaza } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(idRaza));
  }, [idRaza]);

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
            <img src={dogs.image && dogs.image.url} alt="" width={"400px"} />
            <p>Life span: {dogs.life_span}</p>
            <p>Temperament: {dogs.temperament}</p>
            <p>Weight: {dogs.weight} kg</p>
            <p>Height: {dogs.height} cm</p>
          </>
        )}
        <Link to="/home">
          <button className="button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
