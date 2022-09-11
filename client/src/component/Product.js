import React from "react";
import { Card } from "react-bootstrap";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";

// Rating
export const Product = ({ product }) => {
  // console.log(product, "from product ");
  return (
    <Card className="my-4 p-3 rounded ">
      <Link  to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link  style={{ textDecoration: 'none', color: 'black' }}  to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
