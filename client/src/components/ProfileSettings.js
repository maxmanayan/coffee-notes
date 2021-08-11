import React from "react";
import ProfileSettingsCreateClock from "./ProfileSettingsCreateClock";
import ProfileSettingsUpdateClock from "./ProfileSettingsUpdateClock";

const ProfileSettings = (props) => {
  return (
    <div className="user-profile-settings">
      <h1>Settings</h1>
      <div>
        {/* <ProfileSettingsCreateClock /> */}
        <ProfileSettingsUpdateClock hideForm={false} />
      </div>
    </div>
  );
};

export default ProfileSettings;
