import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">
        Será que eu já vi essa merda?
      </Link>
      <Navbar.Toggle aria-controls="navigation" />
      <Navbar.Collapse id="navigation">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Início
          </Link>
          <Link to="/segredo" className="nav-link">
            Segredo
          </Link>
        </Nav>
        <Nav>
          <Link to="/cadastrar" className="nav-link">
            Cadastrar
          </Link>
          <Link to="/entrar" className="nav-link">
            Entrar
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
