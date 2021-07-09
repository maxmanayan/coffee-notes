import React from "react";

const ProfileAddNickname = (props) => {
  const { user } = props;
  return (
    <>
      {!user.nickname && (
        <div>
          <h3>Add Nickname!</h3>
        </div>
      )}
    </>
  );
};

export default ProfileAddNickname;
