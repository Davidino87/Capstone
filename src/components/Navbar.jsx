import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { setUser } from "../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import guerriero from "../assets/guerriero.png";

function CustomNavbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    dispatch(setUser(null));
  };
  const user = useSelector((state) => state.user.activeUser);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            alt="logo"
            src={guerriero}
            width="30"
            height="30"
            className="d-inline-block align-top rounded-circle"
          />{" "}
          Live Event Abruzzo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/favorites">
                  Preferiti
                </Nav.Link>
                <Nav.Link as={Link} to="/create-event">
                  Crea evento
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link as={Link} onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
