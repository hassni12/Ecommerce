import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import FooterStyle from "./footer.module.css";
export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">copyright &copy; E Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};
