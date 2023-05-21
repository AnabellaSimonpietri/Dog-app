import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  //para controlar errores en el form a la hora de que lo complete el usuario
  let errors = {};
  if (!input.name) {
    errors.name = "Need a name";
  } else if (!input.image) {
    errors.image = "Need a image url";
  } //puedo poner que si un numero es mayor a tal o menor tambien tire error.
  return errors;
}

export default function DogsCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [errors, serErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  const [newTemperament, setNewTemperament] = useState("");

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    serErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
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

  function handleSubmit(e) {
    e.preventDefault();
    const updatedInput = {
      ...input,
      temperament: input.temperament.join(","), // Convierte el array en una cadena de texto separada por comas
    };
    dispatch(postDogs(updatedInput));
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>Create a new breed!</h1>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

/* Si quiero que el usuario ponga new temperaments? <div>
<input
  type="text"
  value={newTemperament}
  onChange={(e) => setNewTemperament(e.target.value)}
/>
<button type="button" onClick={handleAddTemperament}>
  Agregar
</button>
</div> */
