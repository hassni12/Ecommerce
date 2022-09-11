import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// Nav

// LinkContainer
export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer style={{color:"black"}} to="/login">
            <Nav.Link >Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{color:"grey"}}>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer style={{color:"black"}} to="/login/shipping">
            <Nav.Link >Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{color:"grey"}}>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment" style={{color:"black"}}>
            <Nav.Link >Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{color:"grey"}}>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder" style={{color:"black"}}>
            <Nav.Link >Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{color:"grey"}}>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
