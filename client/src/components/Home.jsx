import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [filteredDogs, setFilteredDogs] = useState(allDogs);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [temperamentFilter, setTemperamentFilter] = useState("");

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredDogs(allDogs);
  }, [allDogs]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleTemperamentFilterChange = (e) => {
    setTemperamentFilter(e.target.value);
  };

  useEffect(() => {
    let sortedDogs = [...filteredDogs];

    if (sortType === "asc") {
      sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "desc") {
      sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "weight") {
      sortedDogs.sort((a, b) => {
        const weightA = parseFloat(a.weight);
        const weightB = parseFloat(b.weight);
        return weightA - weightB;
      });
    }

    setFilteredDogs(sortedDogs);
  }, [sortType]);

  useEffect(() => {
    let filteredDogs = [...allDogs];

    if (filterType === "api") {
      filteredDogs = allDogs.filter((dog) => !dog.createBD);
    } else if (filterType === "created") {
      filteredDogs = allDogs.filter((dog) => dog.createBD);
    }

    if (temperamentFilter !== "") {
      filteredDogs = filteredDogs.filter((dog) =>
        dog.temperament?.split(", ").includes(temperamentFilter)
      );
    }

    setFilteredDogs(filteredDogs);
  }, [filterType, temperamentFilter, allDogs]);

  return (
    <div>
      <Link to="/dogs">Created Dog</Link>
      <h1>Pink Dogs App</h1>
      <button onClick={() => dispatch(getAllDogs())}>All Dogs</button>
      <div>
        <select value={sortType} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
          <option value="weight">Weight</option>
        </select>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="api">API Dogs</option>
          <option value="created">Created Dogs</option>
          <option value="temperaments">Temperaments</option>
        </select>
        {filterType === "temperaments" && (
          <select
            value={temperamentFilter}
            onChange={handleTemperamentFilterChange}
          >
            <option value="">All Temperaments</option>
            {/* Aquí puedes generar las opciones del select con los temperamentos disponibles */}
            {allDogs
              .flatMap((dog) => dog.temperament?.split(", "))
              .filter(Boolean)
              .map((temperament) => (
                <option key={temperament} value={temperament}>
                  {temperament}
                </option>
              ))}
          </select>
        )}
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={filteredDogs.length}
          paginado={paginado}
        />
        <SearchBar />

        {currentDogs.map((el) => (
          // <Fragment key={el.id}>
          <Link key={el.id} to={`/detail/${el.id}`}>
            <Card
              id={el.id}
              image={el.image.url}
              name={el.name}
              life_span={el.life_span}
              temperament={el.temperament}
              weight={el.weight}
              height={el.height}
            />
          </Link>
          // </Fragment>
        ))}
      </div>
    </div>
  );
}
