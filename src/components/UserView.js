import React, { useState, useEffect } from 'react';

export default function UserView({ ordersData }) {
  const [orders, setOrders] = useState([]);
  console.log(ordersData)

useEffect(() => {
  if (Array.isArray(ordersData.productsOrdered)) {
    const ordersArr = ordersData.productsOrdered.map(productOrder => (
      <tr key={productOrder.product._id}>
      	<td> {ordersData._id}</td>
        <td>{new Date(ordersData.orderedOn).toLocaleString()}</td>
        <td>{productOrder.product}</td>
        <td>{productOrder.quantity}</td>
        <td>&#8364;{productOrder.subtotal}</td>
      </tr>
    ));

    setOrders(ordersArr);
  }
}, [ordersData]);

  return (
    <div className="table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Ordered On</th>
          	<th> Product ID</th>
            <th> Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </table>
    </div>
  );
}
