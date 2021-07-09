import React from "react";
import { Button, Form } from "react-bootstrap";

const ProfileAddNickname = (props) => {
  const { user } = props;
  return (
    <>
      {!user.nickname && (
        <div className="user-profile-nickname-form">
          <h3>Add Nickname!</h3>
          <Form>
            <Form.Group>
              <Form.Control />
            </Form.Group>
            <Button>Add</Button>
          </Form>
        </div>
      )}
      {user.nickname && (
        <div>
          <h3>Nickname: {user.name}</h3>
        </div>
      )}
    </>
  );
};

export default ProfileAddNickname;
