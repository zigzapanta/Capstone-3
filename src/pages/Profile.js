import {useContext, useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateProfile from '../components/UpdateProfile'

export default function Profile(){

    const {user} = useContext(UserContext);

    const [details, setDetails] = useState({});

    useEffect(() => {
    	fetch(`${process.env.REACT_APP_API_BASE_URL}0/users/details`, {
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data)
    		// Set the user states values with the user details upon successful login
    		if(typeof data.user !== "undefined"){
    			setDetails(data.user)
    		} else if(data.error === "User not found") {
    			Swal.fire({
    				title: "User not found",
    				icon: "error",
    				text: "Something went wrong, kindly contact us for assistance."
    			});
    		} else {
    			Swal.fire({
    				title: "Something went wrong",
    				icon: "error",
    				text: "Something went wrong, kindly contact us for assistance."
    			})
    		}
    	})
    }, [])

	return (
        (user.id === null) ?
        <Navigate to="/courses" />
        :
        <>
		<Row>
			<Col className="p-5 bg-primary text-white">
				<h1 className="my-5 ">Profile</h1>
                <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
				<hr />
				<h4>Contacts</h4>
				<ul>
					<li>Email: {details.email}</li>
					<li>Mobile No: {details.mobileNo}</li>
				</ul>
			</Col>
		</Row>
		<Row  className= "pt-4 mt-4">
			<Col>
			</Col>
		</Row>

		<Row  className= "pt-4 mt-4">
			<Col>
			<UpdateProfile />
			</Col>
		</Row>
		</>
	)
}