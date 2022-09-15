import React, { memo, useState, useCallback, useEffect } from "react";
import axios from "axios";
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
// orderDeliverApi
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../component/CheckoutSteps";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { orderDetailApi } from "../component/slice/orderGetSlice";
import { orderPayApi, refresh } from "../component/slice/orderPaySlice";
import { orderDeliverApi, refreshDeliver } from "../component/slice/orderDeliverdSlice";
// orderPayApi
export const OrderDetailScreen = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  const orderDetail = useSelector((p) => p.orderDetails);
  const orderPay = useSelector((p) => p.orderPay);

  // console.log(orderDetail, "order");
  const { userInfo } = useSelector((p) => p.loginUser);
  const { orderDeliver, isSuccess: successDeliver } = useSelector((p) => p.orderDelivred);
  const { isError, isLoading, isSuccess, order } = orderDetail;
  const { isError: errorPay, isLoading: loadingPay, isSuccess: successPay, order: orderPayDetails } = orderPay;

  console.log(order, "my order");
  const [sdk, setSdk] = useState(false);
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:8000/api/config/paypal"
      );
      console.log(clientId);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    // console.log(order, "order where i find error ")

    if (!order || order._id !== orderId) {

      dispatch(refresh())
      dispatch(refreshDeliver())
      dispatch(orderDetailApi(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }

    } else {
      setSdk(true)
    }
  }, [dispatch, orderId, order,successDeliver]);
  const deliverHandler = ((e) =>
    dispatch(orderDeliverApi(e)))
  console.log(orderDeliver, "orderDeliver");
  const onSuccessPaymentHandler = ((paymentResult) =>

    //  console.log(paymentResult, "result of payment")
    dispatch(orderPayApi({ orderId, paymentResult }))


  )


  if (isSuccess) {

    return (
      <div>
        {isLoading ? (
          <Loader />
        ) :
          isError ? (
            <Message variant="danger">{isError}</Message>
          ) :
            (
              <Row>
                <h1>ORDER ID</h1> <strong>{order._id}</strong>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h5 style={{ fontWeight: "bold" }}>SHIPPING</h5>
                      <p>
                        <strong>Name :</strong>
                        {order.userId.name}
                      </p>
                      <p>
                        <strong>Email :</strong>
                        <Link to={`mailto:${order.userId.email}`}>
                          {order.userId.email}
                        </Link>
                      </p>

                      <p>
                        <strong>Address :</strong>
                        {order.shippingAddress.address},{order.shippingAddress.city}
                        ,{order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant="success">
                          {" "}
                          Delivered Succeccfully{" "}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Delivered Yet</Message>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5 style={{ fontWeight: "bold" }}>PAYMENT METHOD</h5>

                      <p>
                        <strong>Method :</strong>
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant="success"> Payment Succeccfully </Message>
                      ) : (
                        <Message variant="danger">Not Payment</Message>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5 style={{ fontWeight: "bold" }}>ORDER ITEMS</h5>
                      {order.orderItems.length === 0 ? (
                        <Message variant="danger">Order is Empty</Message>
                      ) : (
                        <ListGroup variant="flush">
                          {order.orderItems.map((items, index) => (
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
                                <Col md={1}>=</Col>
                                <Col md={1}>
                                  ${(items.qty * items.price).toFixed(2)}
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
                          <Col>${order.itemsPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${order.shippingPrice}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${order.taxPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Total</Col>
                          <Col>${order.totalPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                      {!order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loader />}
                          {!sdk ? <Loader /> : (
                            <PayPalButton amount={order.totalPrice} onSuccess={onSuccessPaymentHandler}
                            />
                          )}
                        </ListGroup.Item>
                      )}
                      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                          <Button type='button' className="btn btn-primary btn-block" onClick={() => deliverHandler(order._id)}>
                            Mark As Deliverd
                          </Button>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            )}
      </div>
    );
  }
};
