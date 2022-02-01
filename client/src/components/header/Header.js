import React, {useContext} from 'react';
import { GlobalState } from '../../GlobalState';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import axios from 'axios'

function Header() {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  const logoutUser = async () =>{
    await axios.get('/user/logout')
    
    localStorage.removeItem('firstLogin')
    setIsLogged(false)
    
    window.location.href = "/";
}
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Adopt-A-Pet</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/find">Find a Pet</Nav.Link>
          {!isLogged && <Nav.Link href='/login'>Login</Nav.Link>}
          {isAdmin && <Nav.Link href='/addPet'>Add Pet</Nav.Link>}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {isLogged &&<NavDropdown.Item href="/" onClick={logoutUser}>Logout</NavDropdown.Item>}
            {isAdmin &&<NavDropdown.Item href="/request">View Requests</NavDropdown.Item>}
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;
