import React from "react";

const Forecast = ({ forecastWeather, location }) => {
  const accordionItemStyle = {
    backgroundColor: "rgba(85, 141, 146, 0.5)", // Custom color with 50% opacity
    color: "#000", // Black text color
    borderRadius: "5px", // Rounded corners
    marginBottom: "1rem", // Margin between accordion items
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow for depth
  };

  const accordionHeaderStyle = {
    backgroundColor: "transparent", // Make header background transparent
    color: "#000", // Text color for header
    border: "none", // Remove border
    fontWeight: "bold", // Bold text for header
    padding: "15px", // Adjust padding for header
    fontSize: "1rem", // Font size for the header
    cursor: "pointer", // Make header clickable
    display: "flex", // Flex layout for header content
    alignItems: "center", // Vertically align items
    justifyContent: "space-between", // Space between elements
  };

  return (
    <div className="container mt-5">
      <h4 className="text-white text-center">
        Forecast Weather of {location.name}, {location.region}
      </h4>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {forecastWeather.forecastday.map((data, index) => {
          return (
            <div className="accordion-item" key={index} style={accordionItemStyle}>
              <div className="accordion-header" style={accordionHeaderStyle} data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                <div className="d-flex flex-row align-items-center mb-3">
                  <div className="p-2">Day: {data.date}</div>
                  <div className="p-2">
                    <img src={data.day.condition.icon} alt={data.day.condition.text} />
                  </div>
                  <div className="p-2">{data.day.condition.text}</div>
                  <div className="p-2">Max temp: {data.day.maxtemp_c} °C</div>
                </div>
              </div>
              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {data.hour.map((hourData, hourIndex) => {
                    return (
                      <div key={hourIndex}>
                        <h5>{new Date(hourData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - Temp: {hourData.temp_c} °C</h5>
                        <div
                          className="progress mb-3"
                          role="progressbar"
                          aria-valuenow={hourData.temp_c}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar progress-bar-striped"
                            style={{ width: `${hourData.temp_c}%` }}
                          >
                            {hourData.temp_c} °C
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
