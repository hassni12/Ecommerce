import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../component/slice/cartSlice";
import { CheckoutSteps } from "../component/CheckoutSteps";
import { Form, Col } from "react-bootstrap";
// Form
export const PaymentScreen = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((p) => p.cart);

  const [paymentMethod, setPaymentMethod] = useState("");

  if (!shippingAddress) {
    navigation("/login/shipping");
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigation("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <h1 style={{ margin: "1rem 0" }}>Payment Methods</h1>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or credit card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Strip"
              id="Strip"
              name="paymentMethod"
              value="Strip"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};
