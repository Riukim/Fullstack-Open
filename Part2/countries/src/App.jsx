import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState(null);
  const [weather, setWeather] = useState({});

  // useEffect hook responsible for fetching countries from rescountries.com, based on the input from searchbar
  useEffect(() => {
    if (country.trim() === "") {
      setCountries([]);
      return;
    }
    console.log("fetching countries");

    axios
      .get(`https://restcountries.com/v2/name/${country}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);

        setCountries([]);
      });
  }, [country]);

  // useEffect hook responisble for fetching weather data from openweathermap.org based on selected country
  useEffect(() => {
    if (countries.length > 0) {
      const selectedCountry = countries[0];

      if (selectedCountry.capital && selectedCountry.capital.trim() !== "") {
        const capital = selectedCountry.capital;
        console.log("fetching weather");

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
          )
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            console.error("Error fetching weather", error);
            setWeather([]);
          });
      }
    }
  }, [countries, api_key]);

  // Handle change in the search bar
  const handleSearchChange = (event) => {
    const newCountryValue = event.target.value;

    setCountry(newCountryValue);
    setSearchCountry(null);
  };

  // Handle country selection from the list
  const handleCountrySelection = (selected) => {
    setCountry(selected.name);
    setSearchCountry(selected);
  };

  // Rendering components
  return (
    <div>
      <Search country={country} handleSearchChange={handleSearchChange} />

      <CountriesList
        countries={countries}
        handleCountrySelection={handleCountrySelection}
        weather={weather}
      />
    </div>
  );
};

export default App;
