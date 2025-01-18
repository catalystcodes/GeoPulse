import React from "react";

const CountryList = ({ countries, onShowDetails }) => {
  if (countries.length === 0) {
    return null;
  }

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>
            {country.name.common}
            <button onClick={() => onShowDetails(country)}>Show Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
