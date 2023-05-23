//Este es mi componente Search Bar que despacha la acción cuando se realiza la búsqueda.
//searchTerm es una variable de estado local que almacenar el texto de búsqueda ingresado,
//componente SearchBar que utiliza el hook useState para almacenar el valor, filtrar resultados y buscar.

//Nav va acá!!
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../actions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch(); //dispatch es una función de Redux que envía una acción.

  const handleSearch = () => {
    //función que se ejecuta cuando el usuario hace clic en el botón
    dispatch(searchDog(searchTerm));
  };

  return (
    <div>
      <input
        type="text" //Ayuda al cliente qué saber qué poner, en este caso un texto
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} //onChange es un evento en React que se dispara cuando el valor de un elemento de entrada (input) cambia.
        placeholder="Search by breed name"
      />
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
