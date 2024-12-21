import React from "react";
import "./GlassEffect.css"; // Import the CSS file


const GlassEffect = () => {
  return (
    <div className="content">
      {/* Toggle for day-night effect */}
      <input type="checkbox" id="day-night" />
      <label htmlFor="day-night"></label>

      {/* Moon-Sun Animation */}
      <div className="moon-sun"></div>

      {/* Stars and other animations */}
      <div className="lights"></div>
      <div className="clouds"></div>

      {/* Windows Pending part */}
      <div className="floor">
        <div className="side"></div>
      </div>
    </div>
  );
};

export default GlassEffect;
