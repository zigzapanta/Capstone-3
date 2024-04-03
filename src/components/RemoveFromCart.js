// RemoveFromCart.js

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RemoveFromCart({ productId, onRemoveSuccess }) {
  const [loading, setLoading] = useState(false);

  const removeFromCart = () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);

        if (data.message === 'Item removed from cart successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Item removed from cart successfully'
          }).then(() => {
            // Manually fetch the updated cart data
            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(res => res.json())
              .then(updatedData => {
                console.log('Updated cart data after removal:', updatedData);
                // Call the callback function to update the state in the parent component
                onRemoveSuccess(updatedData.userCart && updatedData.userCart.cartItems ? updatedData.userCart.cartItems : []);
              })
              .catch(error => console.error('Error fetching updated cart data:', error));
          });
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Something went wrong'
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button className="btn btn-danger" onClick={removeFromCart} disabled={loading}>
      {loading ? 'Removing...' : 'Remove'}
    </Button>
  );
}
