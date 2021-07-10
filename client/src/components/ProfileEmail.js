import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProfileEmail = (props) => {
  const { user } = props;
  return (
    <>
      <Row className="user-profile-email">
        <Col md={{ span: 1, offset: 4 }} className="user-profile-categories">
          <h3>Email:</h3>
        </Col>
        <Col md={2} className="user-profile-info">
          <h3>{user.email}</h3>
        </Col>
      </Row>
    </>
  );
};

export default ProfileEmail;
