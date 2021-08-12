import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import cnLogo from "../images/coffee-notes-logo.png";
import WorldClock from "./WorldClock";
// import ProfileSettings from "./ProfileSettings";
import ProfileSettingsUpdateClock from "./ProfileSettingsClockForm";

const NavBar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
      <Navbar fixed="top">
        <div className="navbar">
          <div className="navbar-left">
            <Navbar.Brand className="navbar-logo" href="home">
              <img src={cnLogo} height="40px" />
            </Navbar.Brand>
            {user && <WorldClock />}
          </div>
          <Nav>
            <Nav.Link
              href="/about"
              style={{ color: "white", fontSize: "1.2em", fontWeight: "bold" }}
            >
              About
            </Nav.Link>
            {user && (
              <Nav.Link
                href="/profile"
                style={{
                  color: "white",
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                {user.nickname ? user.nickname : "Profile"}
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                onClick={() => handleLogout(history)}
                style={{
                  color: "white",
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
