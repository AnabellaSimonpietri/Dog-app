import React, { useState, useEffect } from "react";

const Filters = ({
  sortType,
  handleSortChange,
  filterType,
  handleFilterChange,
  temperamentFilter,
  handleTemperamentFilterChange,
  allDogs,
}) => {
  const [uniqueTemperaments, setUniqueTemperaments] = useState([]);

  useEffect(() => {
    // Obtengo todos los temperamentos de los perros
    const temperaments = allDogs
      .flatMap((dog) => dog.temperament?.split(", "))
      .filter(Boolean);
    const unique = [...new Set(temperaments)];
    const sorted = unique.sort((a, b) => a.localeCompare(b)); // Ordena los temperamentos alfabéticamente
    setUniqueTemperaments(sorted);
  }, [allDogs]);

  return (
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
          {uniqueTemperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Filters;
