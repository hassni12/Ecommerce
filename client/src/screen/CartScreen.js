import React, { useCallback } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { addToCartApi, removeCartItem } from "../component/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Nav from "react-bootstrap/Nav";
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
// Container
import Message from "../component/Message";
// Message
// useCallback
export const CartScreen = () => {
  // useCallback(() =>{

  // })
  const navigation=useNavigate()
  const params = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const id = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  
  // console.log(qty,id);
  const { cartItem } = useSelector((p) => p.cart);
  console.log(cartItem, "data from cart screen");
  useEffect(() => {
    if (id) {
      dispatch(addToCartApi({ id, qty }));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (item) => {

    dispatch(removeCartItem(item))
  };

  const checkOutHandler = () => { 
    navigation(`/login?redirect=shipping`)
     };
  return (
    <>
      {/* <Outlet></Outlet> */}
      <Container>
        <Row>
          <Col md={8}>
            <stronge>Shopping Cart</stronge>
            {cartItem.length === 0 ? (
              <Message>
                Cart is Empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush" >
                {cartItem.map((p) => (
                  <ListGroup.Item key={p._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={p.image} alt={p.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            marginTop: ".3rem",
                          }}
                          to={`/products/${p._id}`}
                        >
                          {p.name}{" "}
                        </Link>
                      </Col>
                      <Col md={2} style={{ marginTop: ".4rem" }}>
                        ${p.price}
                      </Col>
                      <Col md={2}>
                        <Form.Select
                          style={{ marginTop: ".4rem" }}
                          size="sm"
                          as="select"
                          value={p.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCartApi({
                                id: p._id,
                                qty: Number(e.target.value),
                              })
                            )
                          }
                        >
                          <option>option</option>
                          {[...Array(p.countInStock).keys()].map((x) => (
                            <>
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            </>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Button
                          style={{ marginTop: ".4rem" }}
                          variant="light"
                          type="button"
                          onClick={() => removeFromCartHandler(p)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total Amount
                    <strong>
                      {" "}
                      $
                      {
                        cartItem
                          .reduce((acc, items) => {
                            console.log(acc);
                            return acc + items.qty * items.price;
                          }, 0)
                          .toString()
                          .split(".")[0]
                      }
                    </strong>{" "}
                </h3>
                    <p>
                      You have saved 
                        </p>
                        <strong>

                          
                      $.{
                        cartItem
                          .reduce((acc, items) => {
                            console.log(acc);
                            return acc + items.qty * items.price;
                          }, 0)
                          .toFixed(2)
                          .split(".")[1]
                      }
                  
                        </strong>
                      
                
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItem.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
