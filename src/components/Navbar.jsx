import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LogoutComp } from "./index";
import checkToken from "../utils/checkToken";

export default function Nabvbar() {

  let user_id = localStorage.getItem("user_id");

  function verifyToken() {
    if (!checkToken()) {
      return <Nav.Link href="/sign-up">Sign Up</Nav.Link>;
    } else {
      return (
        <>
        <Nav.Link href={`/profile-dp/${user_id}`}>My profile</Nav.Link>
        <LogoutComp />
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.2">
        Another action
      </NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">
        Separated link
      </NavDropdown.Item>
    </NavDropdown>
        </>
      
      );
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Musker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {verifyToken()}
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
