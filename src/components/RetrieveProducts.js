// AllProducts.js
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Products from './Products';

export default function AllProducts() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  return (
    <>
      {/* Button to open the modal with ProductsPage content */}
      <Button variant="dark"  size="sm" className="m-3" onClick={() => setShowAllProducts(true)}>
        View All Products
      </Button>

      {/* Modal for ProductsPage content */}
      <Modal show={showAllProducts} onHide={() => setShowAllProducts(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>All Products</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Products />
        </Modal.Body>

        <Modal.Footer>
          {/* Use Link component to navigate to the Products page */}
          <Link to="/admindashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

