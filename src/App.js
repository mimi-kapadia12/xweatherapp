import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState();

  const API_KEY = "e61fd350bc694fbabf4160224232809";
  const API_ENDPOINT = "https://api.weatherapi.com/v1/current.json";

  const fetchWeatherData = async () => {
    if (city) {
      setIsLoading(true);
      await fetch(`${API_ENDPOINT}?key=${API_KEY}&q=${city}`)
        .then((res) => {
          if (!res.ok) {
            alert("Failed to fetch weather data");
            console.log(
              `Failed to fetch data: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
        .then((data) => {
          setTemperature(data);
        })
        .catch((err) => {
          console.error("Error while fetching the data: ", err);
          alert("Failed to fetch weather data");
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <form className="form-inline my-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control m-1"
            placeholder="Enter city name"
            aria-label="Search"
            aria-describedby="searchButton"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="input-group-append m-1">
            <button
              className="btn btn-success"
              type="button"
              id="searchButton"
              onClick={fetchWeatherData}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {isLoading && <p className="text-center">Loading data… </p>}
      {!isLoading && temperature && temperature.current && (
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <Card
              title="Temperature"
              value={`${temperature.current.temp_c}°C`}
            ></Card>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <Card
              title="Humidity"
              value={`${temperature.current.humidity}%`}
            ></Card>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <Card
              title="Condition"
              value={`${temperature.current.condition.text}`}
            ></Card>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <Card
              title="Wind Speed"
              value={`${temperature.current.wind_kph} kph`}
            ></Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
