import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for routing
import ProductCard from '../components/ProductCard';
import AddToCart from '../components/AddToCart';

export default function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProduct(data.product); // Done like this because it is a nested object
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [productId]);

  console.log('Product in ProductDetails:', product);

  // Check if product is defined
  if (!product) {
    return <p>Loading...</p>; // or return a loading indicator
  }

  // Destructure properties from product.product

  return (
    <div>

    <ProductCard product={product}/>
    <Link to={`/products`} className="d-flex justify-content-center" >
    <Button id="back-to-products-button"className="btn btn-primary">Back to Products</Button>
    </Link>
    <AddToCart product={product}/>

    </div>
  );
}
