import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ClearCart({ onRemoveSuccess }) {
  const [loading, setLoading] = useState(false);

  const clearCart = () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Cart cleared successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Cart cleared successfully'
          }).then(() => {
            // Manually fetch the updated cart data
            fetch('http://localhost:4000/cart/get-cart', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(res => res.json())
              .then(updatedData => {
                console.log('Updated cart data after clearing:', updatedData);
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
    <button id="clear-cart-button"className="btn btn-danger" onClick={clearCart} disabled={loading}>
      {loading ? 'Clearing...' : 'Clear Cart'}
    </button>
  );
}
