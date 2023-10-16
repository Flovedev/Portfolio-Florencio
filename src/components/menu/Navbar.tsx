import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar className="bg-transparent pt-5 mx-4" bg="light" expand="lg">
      <Navbar.Brand className="text-white">Flo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/" className="text-white">
            Flo
          </Nav.Link> */}
        </Nav>
        <Button variant="outline-secondary">Menu</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
