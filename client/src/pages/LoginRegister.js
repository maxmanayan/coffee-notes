import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegister = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  return(
    <div className='login-register'>
      <Row style={{paddingTop: '6em', paddingBottom: '1em'}}>
        <Col md={{span: 5, offset: 6}}>
          <h1 className='login-register-title'>Coffee Notes</h1>
        </Col>
      </Row>

      <Row style={{paddingTop: '1em', paddingBottom: '1em'}}>
        <Col md={{span: 5, offset: 6}}>
          <Button style={{marginRight: '1em', padding: '1em 3em',background: '#09080400', border: 'none', fontWeight: 'bold'}} onClick={()=>setShowRegisterForm(false)}>LOGIN</Button>
          <Button style={{marginRight: '1em', padding: '1em 3em', background: '#09080400', border: 'none', fontWeight: 'bold'}} onClick={()=>setShowRegisterForm(true)}>SIGN UP</Button>
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