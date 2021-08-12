import React from "react";
import ProfileSettingsClockForm from "./ProfileSettingsClockForm";

const ProfileSettings = (props) => {
  return (
    <div className="user-profile-settings">
      <h1>Settings</h1>
      <div>
        <ProfileSettingsClockForm />
      </div>
    </div>
  );
};

export default ProfileSettings;
