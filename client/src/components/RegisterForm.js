import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const RegisterForm = () => {
  const { handleRegister } = useContext(AuthContext)
  const history = useHistory()

  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('account', account)
    handleRegister({ ...account }, history)
  }


  return(
    <>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control autoFocus placeholder='Name' id='name' value={account.name} onChange={(e) => setAccount({...account, name: e.target.value})} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder='Email' id='email' value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder='Password' id='password' value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})} />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder='Confirm Password' id='passwordConfirmation' value={account.passwordConfirmation} onChange={(e) => setAccount({...account, passwordConfirmation: e.target.value})} />
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  )
};

export default RegisterForm