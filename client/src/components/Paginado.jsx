import React from "react";

export default function Paginado({
  dogsPerPage,
  allDogs,
  currentPage,
  paginado,
}) {
  const pageNumbers = []; //declaro un arreglo vacio.

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
    pageNumbers.push(i + 1); //divide todos los personajes por la cantidad que yo quiero (8)
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div
              className={`number ${currentPage === number ? "active" : ""}`}
              key={number}
            >
              <a onClick={() => paginado(number)}>{number}</a>
            </div>
          ))}
      </ul>
    </nav>
  );
}
