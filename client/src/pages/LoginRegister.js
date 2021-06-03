import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegister = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  return(
    <div className='login-register'>
      <Row style={{paddingTop: '3em', paddingBottom: '1em'}}>
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
    </div>
  )
};

export default LoginRegister