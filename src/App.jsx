import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Current from "./components/Current";
import Forecast from "./Components/Forecast";
import '../node_modules/bootstrap/dist/js/bootstrap';

export default function App() {
  const [city, setCity] = useState("");
  const [clickedCity, setClickedCity] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const autoCompURL = import.meta.env.VITE_WEATHER_API_KEY;
  const cityURL = import.meta.env.VITE_WEATHER_API_CITY;
  const BGIMG = import.meta.env.VITE_BACKGROUND_IMG;

  const WeatherURL = (city) => `${cityURL}${city}&days=7&aqi=no&alerts=no`;

  useEffect(() => {
    // Check internet connection
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompAPI();
    }
  }, [city]);

  const fetchAutoCompAPI = async () => {
    try {
      const response = await axios.get(autoCompURL + city);
      if (response.data) {
        const cityData = response.data.map(
          (data) => `${data.name},${data.region},${data.country}`
        );
        setCitySuggestion(cityData);
      } else {
        setCitySuggestion([]);
        setError("No suggestions found. Please try a different query.");
      }
    } catch (e) {
      setError("Error fetching city suggestions. Please try again.");
    }
  };

  const handleSelectedCity = (city) => {
    setClickedCity(city);
    fetchWeatherAPI(city);
    setCitySuggestion([]);
  };

  const fetchWeatherAPI = async (city) => {
    try {
      const response = await axios.get(WeatherURL(city));
      if (response.data) {
        setCurrentWeather(response.data.current);
        setForecastWeather(response.data.forecast);
        setLocation(response.data.location);
      } else {
        setError("Weather data not available for the selected city.");
      }
    } catch (e) {
      setError("Error fetching weather data. Please try again.");
    }
  };

  return (
    <div
      className="bg-opacity-75 p-5"
      style={{
        backgroundImage: `url(${BGIMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {isOffline && (
        <div className="alert alert-warning text-center">
          You are offline. Please check your internet connection.
        </div>
      )}
      <input
        type="text"
        value={clickedCity || city}
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
          setCity(e.target.value);
          setClickedCity("");
          if (!e.target.value) {
            setCurrentWeather(null);
            setForecastWeather(null);
            setLocation(null);
          }
        }}
      />
      {error && (
        <div className="alert alert-danger text-center mt-2">{error}</div>
      )}
      {citySuggestion.map((city, index) => (
        <div
          key={index}
          className="text-center bg-info rounded p-1 bg-opacity-10 border border-info border-opacity-25 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => handleSelectedCity(city)}
        >
          {city}
        </div>
      ))}
      {currentWeather && <Current currentWeather={currentWeather} location={location} />}
      {forecastWeather && <Forecast forecastWeather={forecastWeather} location={location} />}
    </div>
  );
}
