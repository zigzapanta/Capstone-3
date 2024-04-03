import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateProduct = ({ product, fetchData }) => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (product) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch product. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.product) {
          console.log("here:", data);
          setProductId(data.product._id);
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setShowEdit(true);
        } else {
          console.error('Unexpected data structure:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching product:', error.message);
      });
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName('');
    setDescription('');
    setPrice(0);
  };

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
        console.log(data);

        if (data.message === "Product updated successfully") {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product updated successfully'
          });

          console.log('After alert')

          // Trigger the parent component to refetch data
          fetchData();

          // Close the modal
          closeEdit();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again'
          });

          // Close the modal
          closeEdit();
        }
      })
      .catch(error => {
        console.error('Error updating product:', error.message);
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
        Update
      </Button>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={e => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProduct;
