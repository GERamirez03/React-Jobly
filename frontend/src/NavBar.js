import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./userContext";

/**
 * A navigation bar component for Jobly.
 * 
 * By default, only shows navigation links to the Jobly home, login, and signup pages.
 * 
 * Users must be signed in to see the navigation links to the companies, jobs, and profile details pages.
 * Logged-in users will also be able to see a link to log out of Jobly. * 
 */

function NavBar() {

  const { currentUser, logout } = useContext(UserContext);

  const { username } = currentUser;

  return (
    <div>
      <Navbar expand="md">
        
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>

        { /** Routes for logged-in users */ 
           
          username && 
           <>
             <NavItem>
                <NavLink to="/companies">companies</NavLink>
             </NavItem>

             <NavItem>
                <NavLink to="/jobs">jobs</NavLink>
             </NavItem>

             <NavItem>
                <NavLink to="/profile">profile</NavLink>
             </NavItem>

             <NavItem>
                <NavLink to="/" onClick={() => logout()}>Log Out { username }</NavLink>
             </NavItem>
           </>
        }

        { /** Routes for logged-out users */
            
          !username && 
            <>
              <NavItem>
                <NavLink to="/login">login</NavLink>
              </NavItem>

              <NavItem>
                <NavLink to="/signup">signup</NavLink>
              </NavItem>
            </>
        }

          


        </Nav>

      </Navbar>
    </div>
  );
}

export default NavBar;
