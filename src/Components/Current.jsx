import React from "react";

const cardStyle = {
  backgroundColor: "white", // Card background color
  color: "black", // Text color
  border: "1px solid #f8f9fa", // Light border color
  borderRadius: "10px", // Rounded corners
  marginBottom: "1rem", // Margin between cards
  height: "150px", // Fixed height for all cards
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  maxWidth: "100%", // Responsive image width
  maxHeight: "80%", // Limit image height
  objectFit: "contain", // Maintain aspect ratio
};

const WeatherCard = ({ title, content }) => (
  <div className="col-3">
    <div style={cardStyle}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: "100%" }}>
        <h5 className="card-title">{title}: {content}</h5>
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
