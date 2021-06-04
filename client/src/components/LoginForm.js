import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const LoginForm = () => {
  const { handleLogin, authenticated } = useContext(AuthContext)
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
    handleLogin({ ...account }, history)
  }

  return(
    <>
      <h6 className='login-register-form-title'>Login</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='login-register-form-group'>
          <Form.Control autoFocus placeholder='Email' id='email' value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})}/>
        </Form.Group>
        <Form.Group className='login-register-form-group'> 
          <Form.Control placeholder='Password' id='password' value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
        </Form.Group>
        <Button style={{marginTop: '1em', background: '#090804', border: 'none'}} type='submit'>SUBMIT</Button>
      </Form>
    </>
  )
};

export default LoginForm