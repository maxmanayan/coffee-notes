import React, { useContext } from "react";
import ProfileAddNickname from "../components/ProfileAddNickname";
import ProfileName from "../components/ProfileName";
import ProfileEmail from "../components/ProfileEmail";
import { AuthContext } from "../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  // const updateFields = () => {
  //   const
  // }

  return (
    <div className="user-profile">
      <h1 className="user-profile-header">User Profile</h1>
      {user && (
        <div>
          <ProfileName key={user.id} user={user} />
          <ProfileEmail key={user.id} user={user} />
          <ProfileAddNickname key={user.id} user={user} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
