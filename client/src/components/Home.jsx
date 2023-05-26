import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../actions";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [filteredDogs, setFilteredDogs] = useState(allDogs);
  const [sortType, setSortType] = useState(""); //Filtros de tipo peso y altura
  const [filterType, setFilterType] = useState("all");
  const [temperamentFilter, setTemperamentFilter] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    //Estado que incluye opciones de ordenamiento
    setSortType(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleTemperamentFilterChange = (e) => {
    setTemperamentFilter(e.target.value);
  };

  useEffect(() => {
    let sortedDogs = [...filteredDogs]; //Filtros y orden funcionan combinados.

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
    } else if (sortType === "height") {
      sortedDogs.sort((a, b) => {
        const heightA = parseFloat(a.height);
        const heightB = parseFloat(b.height);
        return heightA - heightB;
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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDogs.length / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h1 className="homeTitle">Pink Dogs Cards</h1>
      <div className="buttonContainer">
        <Link to="/dogs" className="button">
          Created Dog
        </Link>
        <button className="button" onClick={() => dispatch(getAllDogs())}>
          All Dogs
        </button>
        <SearchBar />
      </div>
      <div>
        <select value={sortType} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="weight">Weight</option>
          <option value="height">Height</option>
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
            {/* Acá el usuario puede generar las opciones del select con los temperamentos disponibles */}
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
      </div>

      <div className="cardContainer">
        {currentDogs.map((el) => (
          <div className="card" key={el.id}>
            <img className="cardImage" src={el.image.url} alt={el.name} />
            <Link to={`/detail/${el.id}`} className="cardTitle">
              {el.name}
            </Link>
            <div className="cardDetails">
              <p>Life Span: {el.life_span}</p>
              <p>Temperament: {el.temperament}</p>
              <p>Weight: {el.weight} kg</p>
              <p>Height: {el.height} cm</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`number ${number === currentPage ? "active" : ""}`}
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        ))}

        <button
          className={`backToTopButton ${showBackToTop ? "visible" : ""}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to Top
        </button>
      </div>

      <div className="appCreatedBy">
        ♡ App created by{" "}
        <a
          href="https://www.linkedin.com/in/anabellasimonpietri/"
          target="_blank" //se abre en nueva ventana.
          rel="noopener noreferrer" //privacidad de información.
        >
          @Anabella.Simonpietri
        </a>
      </div>
    </div>
  );
}
