import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const CustomNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>pam.edu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <LinkContainer to="/list/teachers">
                <Nav.Link>Professores</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/list/adults">
                <Nav.Link>Responsáveis</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/list/students">
                <Nav.Link>Estudantes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/list/courses">
                <Nav.Link>Cursos</Nav.Link>
            </LinkContainer>
            </Nav>
        </Navbar.Collapse>        
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;