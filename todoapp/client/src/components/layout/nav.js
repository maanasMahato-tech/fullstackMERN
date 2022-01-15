import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function NavBar() {
  const LogOut = () => {
    localStorage.removeItem('auth-token');
    window.location.reload(false);
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand >iNoteBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {
            localStorage.getItem('auth-token') ?
              <div className="navlinks flex">
                <Link to="/">Home</Link>
                <Button onClick={LogOut}>LogOut</Button>
              </div>
              :
              <div className="navlinks flex">
                <Link to="/">Home</Link>
                <Link to="/login" >Login</Link>
                <Link to="/signup" >Sign up</Link>
              </div>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;