import React, { useContext, useState } from "react";
import ProfileAddNickname from "../components/ProfileAddNickname";
import ProfileName from "../components/ProfileName";
import ProfileEmail from "../components/ProfileEmail";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const [updatedCard, setUpdatedCard] = useState(false);

  return (
    <div className="user-profile">
      <h1 className="user-profile-header">User Profile</h1>
      {updatedCard && (
        <div className="user-profile-updated-container">
          <div className="user-profile-updated-card">Profile updated!</div>
          <div className="user-profile-updated-icon">
            <Icon.XCircleFill
              size={12}
              style={{ cursor: "pointer" }}
              onClick={() => setUpdatedCard(false)}
            />
          </div>
        </div>
      )}
      {user && (
        <div>
          <ProfileName key={user.id} user={user} />
          <ProfileEmail key={user.id} user={user} />
          <ProfileAddNickname
            key={user.id}
            user={user}
            setUpdatedCard={setUpdatedCard}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
