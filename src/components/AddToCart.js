import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddToCart({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        if (data.message === 'Item added to cart successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Item added to cart successfully'
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again'
          });
        }
        handleClose(); // Close the modal after adding to cart
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Something went wrong. Please try again later.'
        });
        handleClose(); // Close the modal on error
      });
  };

  return (
    <>
      <Button id="add-to-cart-button" onClick={handleShow} className="btn btn-warning">
        Add to Cart
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
