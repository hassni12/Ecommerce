{isLoading ?<Loader/>:isError?<Message variant="danger">{isError}</Message>:
    
<Row>
    {/* <h1>{order._id}</h1> */}
  <Col md={8}>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h5 style={{ fontWeight: "bold" }}>SHIPPING</h5>

        <p>
          <strong>Address :</strong>
          {order.shippingAddress.address},{order.shippingAddress.city},
          {order.shippingAddress.postalCode},{order.shippingAddress.country}
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5 style={{ fontWeight: "bold" }}>PAYMENT METHOD</h5>

        <p>
          <strong>Method :</strong>
          {order.paymentMethod}
        </p>
      </ListGroup.Item>
      <ListGroup.Item>
        <h5 style={{ fontWeight: "bold" }}>ORDER ITEMS</h5>
        {order.orderItem.length === 0 ? (
          <Message variant="danger">Order is Empty</Message>
        ) : (
          <ListGroup variant="flush">
            {order.orderItem.map((items, index) => (
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
        <ListGroup.Item>
          {isError && <Message variant="danger">{isError}</Message>}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={order.orderItem === 0}
          //   onClick={placeOrderHandler}
          >
            PLACE ORDER
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </Col>
</Row>
}
