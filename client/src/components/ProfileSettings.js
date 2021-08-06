import React from "react";
import ProfileSettingsCreateClock from "./ProfileSettingsCreateClock";
import ProfileSettingsUpdateClock from "./ProfileSettingsUpdateClock";

const ProfileSettings = (props) => {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <ProfileSettingsCreateClock />
        <ProfileSettingsUpdateClock />
      </div>
    </div>
  );
};

export default ProfileSettings;
