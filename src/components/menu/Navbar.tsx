import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar className="bg-transparent pt-5 mx-4" bg="light" expand="lg">
      <Navbar.Brand>Flo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Florencio Villanueva</Nav.Link> */}
        </Nav>
        <Button variant="outline-success">Menu</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
