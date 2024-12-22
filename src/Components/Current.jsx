import React from "react";

// Card style for WeatherCard component
const cardStyle = {
  backgroundColor: "rgba(85, 141, 146, 0.5)", // Semi-transparent light blue
  color: "#000", // Black text color
  padding: "15px", // Spacing inside the card
  borderRadius: "5px", // Rounded corners
  fontWeight: "bold", 
  fontSize: "1rem", 
  textAlign: "center", // Center-align content
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow for depth
  margin: "10px", // Space between cards
  height: "100%", // Ensure full-height content
};

// Image style for weather condition icon
const imageStyle = {
  maxWidth: "100%", // Responsive image width
  maxHeight: "80%", // Limit image height
  objectFit: "contain", // Maintain aspect ratio
};

// WeatherCard component that takes title and content as props
const WeatherCard = ({ title, content }) => (
  <div className="col-3">
    <div style={cardStyle}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: "100%" }}>
        <h5 className="card-title">{title}</h5>
        <div className="card-content">{content}</div>
      </div>
    </div>
  </div>
);

const Current = ({ currentWeather, location }) => {
  if (!currentWeather || !location) {
    return (
      <p style={{ color: "white", textAlign: "center", backgroundColor: "#343a40", padding: "1rem" }}>
        Loading...
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <h4 style={{ color: "white", textAlign: "center" }}>
        Current Weather of {location.name}, {location.region}
      </h4>
      <div className="row mt-4">
        <WeatherCard
          title="Condition"
          content={
            <img
              src={currentWeather.condition.icon}
              alt={`Weather condition: ${currentWeather.condition.text}`}
              style={imageStyle}
            />
          }
        />
        <WeatherCard title="Temp in C" content={currentWeather.temp_c} />
        <WeatherCard title="Temp in F" content={currentWeather.temp_f} />
        <WeatherCard title="Humidity" content={currentWeather.humidity} />
      </div>
    </div>
  );
};

export default Current;
