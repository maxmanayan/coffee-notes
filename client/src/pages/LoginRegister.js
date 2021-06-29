import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { AuthContext } from "../providers/AuthProvider";

const LoginRegister = () => {
  const { user } = useContext(AuthContext);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="login-register">
      <Row style={{ paddingTop: "6em", paddingBottom: "1em" }}>
        <Col xs={12} sm={12} md={{ span: 5, offset: 6 }}>
          <h1 className="login-register-title">Coffee Notes</h1>
        </Col>
      </Row>

      {!user && (
        <>
          <Row
            style={{
              paddingTop: "1em",
              paddingBottom: "1em",
              marginLeft: "1vw",
              marginRight: "1vw",
            }}
          >
            <Col xs={12} sm={12} md={{ span: 5, offset: 6 }}>
              <Button
                style={{
                  marginRight: "1em",
                  padding: "1em 3em",
                  background: "#09080410",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => setShowRegisterForm(false)}
              >
                LOGIN
              </Button>
              <Button
                style={{
                  marginRight: "1em",
                  padding: "1em 3em",
                  background: "#09080410",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => setShowRegisterForm(true)}
              >
                SIGN UP
              </Button>
            </Col>
          </Row>

          <Row style={{ marginLeft: "1vw", marginRight: "1vw" }}>
            <Col xs={12} sm={12} md={{ span: 5, offset: 6 }}>
              {!showRegisterForm && <LoginForm />}
              {showRegisterForm && <RegisterForm />}
            </Col>
          </Row>
        </>
      )}

      {user && console.log("user", user)}

      {user && (
        <>
          <Row
            style={{
              paddingTop: "1em",
              paddingBottom: "1em",
              marginLeft: "1vw",
              marginRight: "1vw",
            }}
          >
            <Col xs={12} sm={12} md={{ span: 5, offset: 6 }}>
              <h2 className="login-register-welcome">
                Welcome Back, {user.name}
              </h2>
            </Col>
          </Row>
          <Row style={{ marginLeft: "1vw", marginRight: "1vw" }}>
            <Col xs={12} sm={12} md={{ span: 5, offset: 6 }}>
              <Button
                style={{
                  marginRight: "1em",
                  padding: "1em 3em",
                  background: "#090804",
                  border: "none",
                  fontWeight: "bold",
                }}
                href="/home"
              >
                Go to Dashboard
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
