import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showCreate, setShowCreate] = useState(false); // State to control the visibility of the create modal

  // Function to open the create modal
  const openCreate = () => {
    // Reset the form fields or set initial values
    setName('');
    setDescription('');
    setPrice('');
    setShowCreate(true); // Set showCreate to true to open the modal
  };

  // Function to handle the form submission for creating a product
  const createProduct = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      if (data.message === 'Product Registered'){
        Swal.fire({
          title: '"Product Registered"',
          icon: 'success',
          text: 'You have successfully created a product'
        })
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Please try again"
        });
      }
      // Optionally, you can close the modal after successful submission
      setShowCreate(false);
    });
  };

  return (
    <>
      {/* Button to trigger the create modal */}
      <Button variant="warning" size="sm" onClick={openCreate}>
        Create
      </Button>

      {/* CREATE MODAL */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Form onSubmit={createProduct}>
          {/* Modal Header */}
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>

          {/* Modal Body */}
          <Modal.Body>
            {/* Form controls for product details */}
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          {/* Modal Footer */}
          <Modal.Footer>
            {/* Button to close the modal */}
            <Button variant="secondary" onClick={() => setShowCreate(false)}>
              Close
            </Button>
            {/* Button to submit the form and create the product */}
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
