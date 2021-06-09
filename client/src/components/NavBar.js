import React, { useContext } from  "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import cnLogo from '../images/coffee-notes-logo.png'

const NavBar = () => {
  const { user, handleLogout } = useContext(AuthContext)
  const history = useHistory()

  return(
    <div>
      <Navbar fixed='top'>
        <Navbar.Brand className='navbar-logo' href='home'>
          <img
            src={cnLogo}
            height='40px'
          />
        </Navbar.Brand>
        <div className='navbar'>
          <Nav>
            {/* <Nav.Link href='/home' style={{color: 'white', fontSize: '1.2em', fontWeight: 'bold'}}>Home</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href='/about' style={{color: 'white', fontSize: '1.2em', fontWeight: 'bold'}}>About</Nav.Link>
            {user && <Nav.Link href='/profile' style={{color: 'white', fontSize: '1.2em', fontWeight: 'bold'}}>Profile</Nav.Link>}
            {user && <Nav.Link onClick={() => handleLogout(history)} style={{color: 'white', fontSize: '1.2em', fontWeight: 'bold'}}>Logout</Nav.Link>}
          </Nav>
        </div>
      </Navbar>
    </div>
  )
}


export default NavBar