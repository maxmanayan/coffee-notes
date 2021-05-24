import React, { useContext } from  "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {
  const { user, handleLogout } = useContext(AuthContext)
  const history = useHistory()

  return(
    <div>
      <Navbar style={{background: '#628fac8c'}}>
        <Nav>
          <Nav.Link to='/home' >Home</Nav.Link>
          {user && <Nav.Link onClick={() => handleLogout(history)} >Logout</Nav.Link>}
        </Nav>
      </Navbar>
    </div>
  )
}


export default NavBar