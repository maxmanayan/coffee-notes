import React from "react";

const ProfileSettingsCreateClock = (props) => {
  return (
    <div>
      <h3>CreateClock</h3>
      <div>
        <label className="clock-switch">
          <input
            type="checkbox"
            onClick={() => console.log("switch clicked")}
          />
          <span className="clock-switch-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default ProfileSettingsCreateClock;
