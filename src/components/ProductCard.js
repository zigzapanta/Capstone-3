import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { _id, name, price, description } = product;
  const productId = _id;

  return (
    <Link to={`/products/${productId}`} style={{ textDecoration: 'none' }}>
      <Card className="mt-3 product-card">
        <Card.Body className="text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>PhP {price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
