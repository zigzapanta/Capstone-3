// React Bootstrap Components
/*
	- Syntax
		- import moduleName from 'filePath'
*/
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar(){
	// State to store the user information stored in the login page.
	// const [user, setUser] = useState(localStorage.getItem("token"));
	// checking if we received the login token
	// console.log(user); 
	const { user } = useContext(UserContext);

	return (
		<Navbar bg="warning" expand="lg" id="navbar">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">Sari-Sari</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/*The 'as' prop allows components to be treated as if they are different component gaining access to it's properties and functionalities*/}
						{/*The "to" prop is use in place of the "href" prop for providing the URL for the page.*/}
						{/*The "exect" prop is used to highlight the active NavLink component that matches the URL*/}

						<Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
						{(user.id !== null) ? 

							user.isAdmin 
							?
							<>
								<Nav.Link as={Link} to="/admindashboard">Dashboard</Nav.Link>
								<Nav.Link as={Link} to="/orders">Orders</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
							:
							<>
								<Nav.Link as={Link} to="/cart">Cart</Nav.Link>
								<Nav.Link as={Link} to="/orders">Orders</Nav.Link>
								<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							</>
						: 
							<>
								<Nav.Link as={Link} to="/register">Register</Nav.Link>
								<Nav.Link as={Link} to="/login">Login</Nav.Link>
							</>
							}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}