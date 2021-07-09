import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ProfileAddNickname = (props) => {
  const { user } = props;
  const [nickname, setNickname] = useState(null);

  const addNickname = async (e) => {
    e.preventDefault();
    console.log(nickname);
    try {
      let res = await axios.put(`/api/users/${user.id}/edit_user`, {
        ...user,
        nickname: nickname,
      });
      console.log("user", user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user.nickname && (
        <div className="user-profile-nickname-form">
          <h3>Nickname:</h3>
          <Form onSubmit={addNickname}>
            <Form.Group>
              <Form.Control
                placeholder="Add Nickname"
                id="nickname"
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </div>
      )}
      {user.nickname && (
        <div>
          <h3>Nickname: {user.nickname}</h3>
        </div>
      )}
    </>
  );
};

export default ProfileAddNickname;
