import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched initial products:', data);
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchData();
  }, []);

  return (
    <div className="text-center" id="user-products">
      <h1>Products</h1>
      {error ? (
        <div>{error}</div>
      ) : (
        // Map over the products array to render ProductCard components
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
}
