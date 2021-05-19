import React from  "react";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return(
    <div>
      <Navbar style={{background: '#628fac8c'}}>
        <Nav>
          <Nav.Link to='/' >Home</Nav.Link>
          <Nav.Link>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  )
}


export default NavBar