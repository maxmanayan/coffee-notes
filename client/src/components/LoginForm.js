import React from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
return(
  <>
    <h1>Login</h1>
    <Form>
      <Form.Group>
        <Form.Control placeholder='Email'/>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder='Password'/>
      </Form.Group>
      <Button>Submit</Button>
    </Form>
  </>
)
};

export default LoginForm