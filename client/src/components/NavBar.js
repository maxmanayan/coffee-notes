import React, { useContext } from  "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {
  const { user, handleLogout } = useContext(AuthContext)
  const history = useHistory()

  return(
    <div>
      <Navbar>
        <div className='navbar'>
          <Nav>
            <Nav.Link to='/home' style={{color: 'white'}}>Home</Nav.Link>
          </Nav>
          <Nav>
            {user && <Nav.Link onClick={() => handleLogout(history)} style={{color: 'white'}}>Logout</Nav.Link>}
          </Nav>
        </div>
      </Navbar>
    </div>
  )
}


export default NavBar