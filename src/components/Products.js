// Products.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateProduct from './UpdateProduct';
import ArchiveProduct from './ArchiveProduct'

const fetchData = () => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched updated products:', data);
        resolve(data);

      })
      .catch(error => {
        console.error('Error fetching updated products:', error);
        reject('Error fetching products. Please try again.');
      });
  });
};

const ProductsTable = ({ products }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price (PHP)</th>
        <th>isActive</th>
        {/* Add more columns as needed */}
      </tr>
    </thead>
    <tbody>
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>&#8369; {product.price}</td>
            {product.isActive ? (
              <td id="true">true</td>
            ) : (
              <td id="false">false</td>
            )}
            <td>
              <UpdateProduct product={product} fetchData={fetchData} />

            </td>
            <td>
              <ArchiveProduct product={product} isActive={product.isActive} fetchData={fetchData} />

            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">No products available</td>
        </tr>
      )}
    </tbody>
  </table>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchData()
      .then(data => {
        console.log('Fetched initial products:', data);
        setProducts(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    console.log('Products state:', products);
  }, [products]);

  return (
    <div>
      <h1>All Products</h1>
      {error ? (
        <div>{error}</div>
      ) : (
        <ProductsTable products={products} />
      )}
    </div>
  );
};

export default Products;
