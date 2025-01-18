import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      FInd Counties: {""}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default Search;
