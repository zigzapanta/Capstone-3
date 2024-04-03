import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {

    // Allows us to consume the User context object and it's properties to use for user validation
    const {user, setUser} = useContext(UserContext);
    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

   async function authenticate(e) {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (typeof data.access !== 'undefined') {
            // Set the email of the authenticated user in local storage
            localStorage.setItem('token', data.access);
            retrieveUserDetails(data.access);

            Swal.fire({
                title: 'Login Successful',
                icon: 'success',
                text: 'Welcome to Zuitt!',
            });
        } else if (data.error === 'No Email Found') {
            Swal.fire({
                title: 'Email not found.',
                icon: 'error',
                text: 'Check the email you provided.',
            });
        } else {
            Swal.fire({
                title: 'Authentication failed',
                icon: 'error',
                text: 'Check your login details and try again.',
            });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        // Handle the error or log more details if necessary
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'An error occurred during authentication.',
        });
    }
    
    // Clear input fields after submission
    setEmail('');
    setPassword('');

    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    };

    useEffect(() => {
        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    // console.log("User Access:", user.access);

    return (    
         (user.id !== null) ?
            <Navigate to="/products" />
        :
        <div>
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    />
                </Form.Group>

                { isActive ?
                    <Button variant="primary" type="submit" id="submitBtn">
                    Submit
                    </Button>
                :
                    <Button variant="primary" type="submit" id="submitBtn" disabled> 
                    Submit
                    </Button>
                }
            </Form>       
            <h1> Dummy accounts</h1>

            <h2>Admin</h2>
            <h4>email: goku@mail.com</h4>
            <h4>password: goku1234</h4>

            <br/>

            <h2>Regular User</h2>
            <h4>email: pluto@mail.com</h4>
            <h4>password: pluto1234</h4>
            </div>
        )
    }