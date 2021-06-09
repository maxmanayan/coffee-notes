import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const RegisterForm = () => {
  const { handleRegister } = useContext(AuthContext)
  const history = useHistory()

  const [noName, setNoName] = useState(false)
  const [noEmail, setNoEmail] = useState(false)
  const [noPassword, setNoPassword] = useState(false)
  const [noPasswordConfirmation, setNoPasswordConfirmation] = useState(false)

  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (account.name === '') {
      setNoName(true)
    } else {
      setNoName(false)
    }
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
    if (account.passwordConfirmation === '') {
      setNoPasswordConfirmation(true)
    } else {
      setNoPasswordConfirmation(false)
    }

    console.log('account', account)
    console.log('account.name', account.name)
    handleRegister({ ...account }, history)
  }


  return(
    <>
      <h6 className='login-register-form-title'>Sign Up</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='login-register-form-group'>
          <Form.Control autoFocus placeholder='Name' id='name' value={account.name} onChange={(e) => setAccount({...account, name: e.target.value})} />
        </Form.Group>
        {noName && <p className='login-register-error-text'>*Name required to register</p>}
        <Form.Group className='login-register-form-group'>
          <Form.Control placeholder='Email' id='email' value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})} />
        </Form.Group>
        {noEmail && <p className='login-register-error-text'>*Email required to register</p>}
        <Form.Group className='login-register-form-group'>
          <Form.Control placeholder='Password' id='password' value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})} />
        </Form.Group>
        {noPassword && <p className='login-register-error-text'>*Password required to register</p>}
        <Form.Group className='login-register-form-group'>
          <Form.Control placeholder='Confirm Password' id='passwordConfirmation' value={account.passwordConfirmation} onChange={(e) => setAccount({...account, passwordConfirmation: e.target.value})} />
        </Form.Group>
        {noPasswordConfirmation && <p className='login-register-error-text'>*Password must be confirmed</p>}
        <Button style={{marginTop: '1em', background: '#090804', border: 'none'}} type='submit'>SUBMIT</Button>
      </Form>
    </>
  )
};

export default RegisterForm