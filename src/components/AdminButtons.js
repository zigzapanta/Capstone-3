import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct'
import RetrieveProducts from './RetrieveProducts'



export default function AdminButtons(){


	
	return (
		<Row>
			<Col className="p-5 text-center">
				<h1>Admin DashBoard</h1>
				<CreateProduct />
				<RetrieveProducts />
			</Col>
		</Row>
	)
}