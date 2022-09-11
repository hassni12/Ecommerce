import React from "react";
import { Container, Col, Row } from "react-bootstrap";
// Container
export const FormContainer = (props) => {
  return (
    <Container >
      <Row className="justify-content-center">
        <Col md={5} xs={12} >
          {props.children}
        </Col>
      </Row>
    
    </Container>
  );
};
