//Muestra formulario para crear new dog.
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; //Enlaces e historial de navegacion.
import { postDogs, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux"; //Despacho acciones.
import "../styles/DogsCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Need a name";
  } else if (!input.image) {
    errors.image = "Need an image URL";
  }
  return errors;
}

export default function DogsCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [errors, setErrors] = useState({}); //almacena errores de validaciones del formu.
  const [input, setInput] = useState({
    //almacena valores.
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  const [newTemperament, setNewTemperament] = useState("");

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleTemperamentChange(e) {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInput({
      ...input,
      temperament: selectedOptions,
    });
  }

  function handleAddTemperament() {
    if (newTemperament) {
      setInput({
        ...input,
        temperament: [...input.temperament, newTemperament],
      });
      setNewTemperament("");
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedInput = {
      ...input,
      temperament: input.temperament.join(","),
    };
    dispatch(postDogs(updatedInput));
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button className="button">Home</button>
      </Link>
      <h1>Create a new breed!</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div>
            <label>Height</label>
            <input
              type="text"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Weight</label>
            <input
              type="text"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Life Span</label>
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
            />
          </div>
          <label>Temperaments</label>
          <select
            multiple
            value={input.temperament}
            onChange={handleTemperamentChange}
          >
            {temperaments.map((temp) => (
              <option key={temp.name} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div>
            {input.temperament.map((el) => (
              <div key={el} className="divTemp">
                <p>{el}</p>
                <button className="botonX" onClick={() => handleDelete(el)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={newTemperament}
              onChange={(e) => setNewTemperament(e.target.value)}
            />
            <button type="button" onClick={handleAddTemperament}>
              Add Temperament
            </button>
          </div>
          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
