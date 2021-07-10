import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProfileAddNickname = (props) => {
  const { user, setUpdatedCard } = props;
  const [nickname, setNickname] = useState(
    user.nickname ? user.nickname : null
  );

  const addNickname = async (e) => {
    e.preventDefault();
    console.log(nickname);
    try {
      await axios.put(`/api/users/${user.id}/edit_user`, {
        ...user,
        nickname: nickname,
      });
      setUpdatedCard(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="user-profile-nickname">
        <Col
          xs={{ span: 4, offset: 4 }}
          md={{ span: 1, offset: 4 }}
          className="user-profile-categories"
        >
          <h3>Nickname:</h3>
        </Col>
        <Col
          xs={{ span: 6, offset: 4 }}
          md={{ span: 4, offset: 1 }}
          className="user-profile-info"
        >
          <Form onSubmit={addNickname} className="user-profile-form">
            <Form.Group>
              <Form.Control
                style={{
                  background: "#090804",
                  color: "white",
                  fontSize: "24px",
                }}
                placeholder="Add Nickname"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
            {nickname !== user.nickname && (
              <Button
                type="submit"
                style={{
                  background: "#090804",
                  border: "none",
                }}
              >
                Save
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfileAddNickname;
