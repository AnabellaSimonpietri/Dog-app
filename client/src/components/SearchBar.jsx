import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../actions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchDog(searchTerm));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by breed name"
      />
      {searchTerm && (
        <button className="clearButton" onClick={handleClear}>
          x
        </button>
      )}
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
