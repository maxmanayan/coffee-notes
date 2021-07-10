import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProfileName = (props) => {
  const { user, setUpdatedCard } = props;
  const [name, setName] = useState(user.name ? user.name : null);

  const editName = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}/edit_user`, {
        ...user,
        name: name,
      });
      setUpdatedCard(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="user-profile-row">
        <Col
          xs={{ span: 4, offset: 4 }}
          md={{ span: 1, offset: 4 }}
          className="user-profile-categories"
        >
          <h3>Name:</h3>
        </Col>
        <Col
          xs={{ span: 6, offset: 4 }}
          md={{ span: 4, offset: 1 }}
          className="user-profile-info"
        >
          <Form onSubmit={editName} className="user-profile-form">
            <Form.Group>
              <Form.Control
                style={{
                  background: "#090804",
                  color: "white",
                  fontSize: "24px",
                }}
                placeholder="Add Nickname"
                id="nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {name !== user.name && (
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

export default ProfileName;
