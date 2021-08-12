import React from "react";
import ProfileSettingsUpdateClock from "./ProfileSettingsUpdateClock";

const ProfileSettings = (props) => {
  return (
    <div className="user-profile-settings">
      <h1>Settings</h1>
      <div>
        <ProfileSettingsUpdateClock />
      </div>
    </div>
  );
};

export default ProfileSettings;
