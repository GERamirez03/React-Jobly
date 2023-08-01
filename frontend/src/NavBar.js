import React from "react";
// import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

/**
 * A navigation bar component with navigation links to the Jobly homepage
 * and either login and signup OR companies, jobs, and profile.
 * 
 * Highlights current link.
 */

function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">signup</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">profile</NavLink>
          </NavItem>
        </Nav>

      </Navbar>
    </div>
  );
}

export default NavBar;
