// CartComponent.js

import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import CheckOut from '../components/CheckOut';
import RemoveFromCart from '../components/RemoveFromCart';
import ClearCart from '../components/ClearCart';

export default function CartComponent() {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Data from API:', data);
        setCartData(data.userCart && data.userCart.cartItems ? data.userCart.cartItems : []);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  const handleRemoveFromCartSuccess = (updatedCartData) => {
    setCartData(updatedCartData);
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Your Cart</Card.Title>
          {cartData.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td><RemoveFromCart productId={item.productId} onRemoveSuccess={handleRemoveFromCartSuccess} /></td>
                  </tr>
                ))}
              </tbody>
  
            </Table>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Card.Body>
      </Card>
      <CheckOut />
      <ClearCart onRemoveSuccess={handleRemoveFromCartSuccess}/>
    </div>
  );
}
