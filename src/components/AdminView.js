import React, { useState, useEffect } from 'react';
import AdminButtons from './AdminButtons'

export default function AdminView({ ordersData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersArr = ordersData.map(order => (
      <tr key={order._id}>
        <td>{order.userId}</td>
        <td>{new Date(order.orderedOn).toLocaleString()}</td>
        <td>{order._id}</td>
        <td>
          <ul>
            {order.productsOrdered.map(product => (
              <li key={product._id}>
                {product.product} - Quantity: {product.quantity} - Subtotal: &#8364{product.subtotal}
              </li>
            ))}
          </ul>
        </td>
        <td>&#8364{order.totalPrice}</td>
      </tr>
    ));

    setOrders(ordersArr);
  }, [ordersData]);

  return (
    <div className="table-container">
    <AdminButtons />
      <table className="orders-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Ordered On</th>
            <th>Order ID</th>
            <th>Products Ordered</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </table>
    </div>
  );
}
