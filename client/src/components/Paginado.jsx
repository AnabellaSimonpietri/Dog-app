import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = []; //declaro un arreglo vacio.

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
    pageNumbers.push(i + 1); //divide todos los personajes por la cantidad que yo quiero (8)
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </div>
          ))}
      </ul>
    </nav>
  );
}
