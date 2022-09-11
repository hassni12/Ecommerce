import React from "react";
// orderPlaceApi
// import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
  Container,
} from "react-bootstrap";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../component/CheckoutSteps";
import Message from "../component/Message";
import { orderPlaceApi } from "../component/slice/orderSlice";
export const PlaceOrderScreen = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((p) => p.cart);
  const orderCreate = useSelector((p) => p.orderCreate);
  const { isError, isLoading, isSuccess, order } = orderCreate;
  const userData = useSelector((p) => p.loginUser);
  const itemsPrice = cart.cartItem
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = itemsPrice > 1500 ? 0 : 50;

  const after = cart.cartItem
    .reduce((acc, items) => {
      console.log(acc);
      return acc + items.qty * items.price;
    }, 0)
    .toFixed(2)
    .split(".")[0];
  console.log(after);
  const taxes = Number(Number(0.1 * itemsPrice).toFixed(2));
  console.log(shippingPrice, "tax");
  const total = Number(after) + taxes + shippingPrice;
  console.log(total);

  React.useEffect(() => {
    if (isSuccess) {
      navigation(`/order/${order._id}`);
    }
  });
  const placeOrderHandler = () => {
    dispatch(
      orderPlaceApi({
        orderItems: cart.cartItem,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice: taxes,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: total,
      })
    );
  };
  console.log(cart.cartItem);
  return (
    <div>
      <h1>Shipping Summary</h1>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5 style={{ fontWeight: "bold" }}>SHIPPING</h5>

              <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5 style={{ fontWeight: "bold" }}>PAYMENT METHOD</h5>

              <p>
                <strong>Method :</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5 style={{ fontWeight: "bold" }}>ORDER ITEMS</h5>
              {cart.cartItem.length === 0 ? (
                <Message variant="danger">Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItem.map((items, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={items.image}
                            alt={items.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              textDecoration: "none",
                            }}
                            to={`/products/${items._id}`}
                          >
                            {items.name}
                          </Link>
                        </Col>
                        <Col md={1}>{items.qty}</Col>
                        <Col md={1}>${items.price}</Col>

                        <Col md={2}>
                          = ${(items.qty * items.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxes}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${total}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {isError && <Message variant="danger">{isError}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItem === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
