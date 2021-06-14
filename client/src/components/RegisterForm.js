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
  const [invalidPasswordLength, setInvalidPasswordLength] = useState(false)
  const [passwordAndConfirmationNoMatch, setPasswordAndConfirmationNoMatch] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)

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
    if (account.password.split('').length < 6) {
      setInvalidPasswordLength(true)
    } else {
      setInvalidPasswordLength(false)
    }
    if (account.password !== account.passwordConfirmation) {
      setPasswordAndConfirmationNoMatch(true)
      return
    } else {
      setPasswordAndConfirmationNoMatch(false)
    }
    
    let emailFormat = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!emailFormat.test(account.email)) {
      setInvalidEmail(true)
      return
    } else {
      setInvalidEmail(false)
    }

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
        {invalidEmail && <p className='login-register-error-text'>*Invalid email address</p>}
        <Form.Group className='login-register-form-group'>
          <Form.Control placeholder='Password' id='password' value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})} />
        </Form.Group>
        {noPassword && <p className='login-register-error-text'>*Password required to register</p>}
        {invalidPasswordLength && <p className='login-register-error-text'>*Password must be at least 6 characters</p>}
        <Form.Group className='login-register-form-group'>
          <Form.Control placeholder='Confirm Password' id='passwordConfirmation' value={account.passwordConfirmation} onChange={(e) => setAccount({...account, passwordConfirmation: e.target.value})} />
        </Form.Group>
        {noPasswordConfirmation && <p className='login-register-error-text'>*Password must be confirmed</p>}
        {passwordAndConfirmationNoMatch && <p className='login-register-error-text'>*Password and confirmation do not match</p>}
        <Button style={{marginTop: '1em', background: '#090804', border: 'none'}} type='submit'>SUBMIT</Button>
      </Form>
    </>
  )
};

export default RegisterForm