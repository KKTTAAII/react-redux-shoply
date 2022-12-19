import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const cart = useSelector(state => state.cart);
  const quantity =
    Object.values(cart).length === 0
      ? 0
      : Object.values(cart).reduce((acc, next) => acc + next);

  return (
    <Navbar bg="light" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Shoply
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to={"/"}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={"/cart"}>
              <span role="img" aria-label="Cart">🛒{quantity}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
