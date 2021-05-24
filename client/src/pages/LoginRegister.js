import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegister = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  return(
    <>
      <Row style={{marginTop: '3em', marginBottom: '1em'}}>
        <Col md={{span: 5, offset: 6}}>
          <Button style={{marginRight: '1em'}} onClick={()=>setShowRegisterForm(false)}>Login</Button>
          <Button onClick={()=>setShowRegisterForm(true)}>Sign Up</Button>
        </Col>
      </Row>

      <Row>
        <Col md={{span: 5, offset: 6}}>
          {!showRegisterForm && <LoginForm />}
          {showRegisterForm && <RegisterForm />}
        </Col>
      </Row>
    </>
  )
};

export default LoginRegister