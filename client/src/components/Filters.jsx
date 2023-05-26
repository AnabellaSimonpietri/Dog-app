import React from "react";

const Filters = ({
  sortType,
  handleSortChange,
  filterType,
  handleFilterChange,
  temperamentFilter,
  handleTemperamentFilterChange,
  allDogs,
}) => {
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
  );
};

export default Filters;
