import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CheckOut() {
  
  const handleCheckOut = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        if (data.message === 'Successfully Checked Out') {
          Swal.fire({
            title: 'Order Successful',
            icon: 'success',
            text: 'Your order has been placed successfully.'
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.'
          });
        }
      })
      .catch(err => {
        console.error('Error during checkout:', err);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred during checkout. Please try again.'
        });
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Button id="checkout-button" className="btn btn-warning" onClick={handleCheckOut}>
        Checkout
      </Button>
    </div>
  );
}
