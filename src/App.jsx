import React, { useState } from "react";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (query) => {
    if (query === "") {
      setCountries([]);
      setSelectedCountry(null);
      setError("");
      return;
    }

    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );
        if (filteredCountries.length > 10) {
          setError("Too many matches, please specify another filter");
          setCountries([]);
        } else if (
          filteredCountries.length > 1 &&
          filteredCountries.length <= 10
        ) {
          setError("");
          setCountries(filteredCountries);
        } else if (filteredCountries.length === 1) {
          setError("");
          setSelectedCountry(filteredCountries[0]);
          setCountries([]);
        } else {
          setError("No matches found");
          setCountries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <Search onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={countries} onShowDetails={handleShowDetails} />
      )}
    </div>
  );
};

export default App;
