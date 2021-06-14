import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const LoginForm = () => {
  const { handleLogin, authenticated, loginErrorMessage } = useContext(AuthContext)
  const history = useHistory()

  const [noEmail, setNoEmail] = useState(false)
  const [noPassword, setNoPassword] = useState(false)

  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (account.email === '') {
      setNoEmail(true)
    } else {
      setNoEmail(false)
    }

    if (account.password === '') {
      setNoPassword(true)
    } else {
      setNoPassword(false)
    }

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
        {noEmail && <p className='login-register-error-text'>*Email required</p>}
        <Form.Group className='login-register-form-group'> 
          <Form.Control placeholder='Password' type='password' id='password' value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
        </Form.Group>
        {loginErrorMessage && <p className='login-register-error-text'>*Email and/or Password Incorrect</p>}
        {noPassword && <p className='login-register-error-text'>*Password required</p>}
        <Button style={{marginTop: '1em', background: '#090804', border: 'none'}} type='submit'>SUBMIT</Button>
      </Form>
    </>
  )
};

export default LoginForm