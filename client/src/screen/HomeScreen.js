import React, { useEffect } from "react";
import product from "../data/products";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../component/Product";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../component/slice/productSlice";
import { useParams } from "react-router-dom";
import Loader from "../component/Loader";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  const products = useSelector((p) => p.productList);
  const { isError, isLoading, product } = products;



  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <h2>{isError}</h2>
      ) : (
        <Row>
          {product.map((productData) => {
            console.log(productData._id)
            return (
              <Col key={productData._id} sm={12} md={6} lg={3} xl={3}>
                <Product product={productData} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};
