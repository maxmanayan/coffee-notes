import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProfileName = (props) => {
  const { user } = props;
  return (
    <>
      <Row className="user-profile-name">
        <Col
          xs={{ span: 4, offset: 4 }}
          md={{ span: 1, offset: 4 }}
          className="user-profile-categories"
        >
          <h3>Name:</h3>
        </Col>
        <Col
          xs={{ span: 4, offset: 4 }}
          md={{ span: 2, offset: 1 }}
          className="user-profile-info"
        >
          <h3>{user.name}</h3>
        </Col>
      </Row>
    </>
  );
};

export default ProfileName;
