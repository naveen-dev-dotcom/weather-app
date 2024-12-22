import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Current from "./components/Current";
import Forecast from "./Components/Forecast";
import '../node_modules/bootstrap/dist/js/bootstrap';

export default function App() {
  const [city, setCity] = useState();
  const [ClickedCity, setClickedCity] = useState();
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [currentWeather, setCurrent] = useState();
  const [forecastWeather, setForecast] = useState();
  const [location, setLocation] = useState();
  const autoCompURL = import.meta.env.VITE_WEATHER_API_KEY;
  const cityURL = import.meta.env.VITE_WEATHER_API_CITY;
  const BGIMG = import.meta.env.VITE_BACKGROUND_IMG;

  const WeatherURL = (city) => `${cityURL}${city}&days=7&aqi=no&alerts=no`;

  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompAPI();
    }
  }, [city]);

  const fetchAutoCompAPI = async () => {
    try {
      const response = await axios.get(autoCompURL + city);
      const resp = response.data;
      console.log("api call", resp);
      const cityData = resp.map((data) => {
        return `${data.name},${data.region},${data.country}`;
      });
      setCitySuggestion(cityData);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSelectedCity = (city) => {
    console.log("Clicked city", city);
    setClickedCity(city);
    fetchWeatherAPI(city);
    setCitySuggestion();
  };

  const fetchWeatherAPI = async (city) => {
    try {
      const response = await axios.get(WeatherURL(city));
      const resp = response.data;
      setCurrent(resp.current);
      setForecast(resp.forecast);
      setLocation(resp.location);
      console.log('Current', resp.current);
      console.log('Forecast', resp.forecast);
      console.log('Location', resp.location);
    } catch (e) {
      console.log("Weather API error", e);
    }
  };

  return (
    <div
      className="bg-opacity-75 p-5"
      style={{
        backgroundImage: `url(${BGIMG})`,
        backgroundSize: "cover", // Ensures the image covers the entire screen
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundAttachment: "fixed", // Makes the background static (doesn't move when scrolling)
        minHeight: "100vh", // Ensures the container takes up the entire screen height
      }}
    >
      <input
        type="text"
        value={ClickedCity || city} // Set value to ClickedCity if available, otherwise use city
        placeholder="Enter city name"
        className="form-control"
        style={{
          padding: '15px',
          fontSize: "1rem", 
          fontWeight: "bold",
          backgroundColor: 'rgba(85, 141, 146, 0.5)', 
          color: '#000',
        }}
        onChange={(e) => {
          setCity(e.target.value); // Update city state
          setClickedCity(""); // Reset ClickedCity when typing
          if (e.target.value === "") {
            setCurrent();
            setForecast();
            setLocation();
            setClickedCity();
          }
        }}
      />

      {citySuggestion &&
        citySuggestion.map((city, index) => {
          return (
            <div
              key={index}
              className="text-center bg-info rounded p-1 bg-opacity-10 border border-info border-opacity-25 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectedCity(city)}
            >
              {city}
            </div>
          );
        })}

      {currentWeather && <Current currentWeather={currentWeather} location={location} />}
      {forecastWeather && <Forecast forecastWeather={forecastWeather} location={location} />}
    </div>
  );
}
