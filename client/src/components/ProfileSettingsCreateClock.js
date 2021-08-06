import React from "react";

const ProfileSettingsCreateClock = (props) => {
  return (
    <div className="user-profile-clock-toggle">
      <h3>Clock</h3>
      <div className="user-profile-clock-switch">
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
