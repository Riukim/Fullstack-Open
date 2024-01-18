// Component responsible to handle the display of countries, it contains all the logic to display the country list if less than 10 country are a match in the search, and the logic to display the country info if only one match

const CountriesList = ({ countries, handleCountrySelection, weather }) => {
  if (countries.length > 10) {
    return <p>Too many matches, please specify your search</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name}>
            {country.name}
            <button onClick={() => handleCountrySelection(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length === 1 || weather.length > 0) {
    const selected = countries[0];
    const weatherConditions = weather.weather || [];

    return (
      <div>
        <h2>{selected.name}</h2>
        <p>
          <b>Capital:</b>: {selected.capital}
        </p>
        <p>
          <b>Area:</b> {selected.area} km&sup2;
        </p>
        <p>
          <b>Borders:</b>{" "}
          {selected.borders
            ? selected.borders.map((border) => border).join(", ")
            : "N/A"}
        </p>
        <b>Languages</b>:
        <ul>
          {selected.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={selected.flags.png} alt={`${selected.name} flag`} />
        {weatherConditions && weatherConditions.length > 0 && (
          <>
            <h3>Weather in {selected.capital}</h3>
            <p>
              <b>Weather:</b> {weatherConditions[0].main}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherConditions[0].icon}@2x.png`}
              alt=""
            />
            {weather.main && (
              <>
                <p>
                  <b>Temp:</b> {(weather.main.temp - 273.15).toFixed(2)} °C
                  <p>
                    <b>Humidity:</b> {weather.main.humidity} g / m³
                  </p>
                  <p>
                    <b>Wind:</b> {weather.wind.speed} m / s
                  </p>
                </p>
              </>
            )}
          </>
        )}
      </div>
    );
  }
};

export default CountriesList;
