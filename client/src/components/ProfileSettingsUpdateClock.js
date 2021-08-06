import React from "react";

const ProfileSettingsUpdateClock = (props) => {
  return (
    <div>
      <div className="user-profile-clock-form">
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
      <div>
        <h5>12 hour or 24 hour</h5>
        <h5>Show seconds</h5>
      </div>
    </div>
  );
};

export default ProfileSettingsUpdateClock;
