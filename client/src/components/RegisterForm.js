import React from 'react';
import { Button, Form } from 'react-bootstrap';

const RegisterForm = () => {
return(
  <>
    <h1>Sign Up</h1>
    <Form>
      <Form.Group>
        <Form.Control placeholder='Name'/>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder='Email'/>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder='Password'/>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder='Confirm Password'/>
      </Form.Group>
      <Button>Submit</Button>
    </Form>
  </>
)
};

export default RegisterForm