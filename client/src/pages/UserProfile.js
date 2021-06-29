import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-profile">
      <h1 className="user-profile-header">User Profile</h1>
      {user && (
        <div>
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
