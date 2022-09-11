import React, { useEffect } from "react";
import products from "../data/products";
import { Rating } from "../component/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { productFilterById } from "../component/slice/productFilterSlice";
import Loader from "../component/Loader";
import { useState } from "react";
// Loader
export const ProductScreen = () => {
  const { id } = useParams();
    const navigation = useNavigate();
  const [qty, setQty] = useState(0);

  console.log(`${id}`, "params");
  const dispatch = useDispatch();
  const product = useSelector((p) => p.productFilter);
  const { isError, productFilter, isLoading } = product;
  useEffect(() => {
    dispatch(productFilterById(id));
  }, [dispatch, id]);
  const addToCartHandler = () => {
    navigation(`/cart/${productFilter._id}?qty=${qty}`);
  };
  console.log(productFilter,"productFilter")
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h2>{isError}</h2>
      ) : (
        <React.Fragment>
          <Link to="/" className="btn btn-primary my-3 rounded">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={productFilter.image} alt={productFilter.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{productFilter.name}</h2>
                </ListGroup.Item>
              </ListGroup>
              <hr />
              <ListGroup.Item>
                <Rating
                  value={productFilter.rating}
                  text={`${productFilter.numReviews}reviews`}
                />
              </ListGroup.Item>
              <hr />
              <ListGroup.Item>${productFilter.price}</ListGroup.Item>
              <hr />
              <ListGroup.Item>{productFilter.description}</ListGroup.Item>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>${productFilter.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        <strong>
                          {productFilter.countInStock > 0
                            ? "In Stock"
                            : "Out Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {productFilter.countInStock > 0 ? (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity :</Col>
                        <Col>
                          <Form.Select
                            size="sm"
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            <option>option</option>
                            {[...Array(productFilter.countInStock).keys()].map(
                              (x) => (
                                <>
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                </>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : (
                    ""
                  )}
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={productFilter.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      {" "}
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </>
  );
};
