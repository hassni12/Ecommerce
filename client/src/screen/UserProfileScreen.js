import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
// IndexLinkContainer
// myOrderDetailsApi
// profileUpdatedApi
// Table
//   getUser
//   getUserProfileSlice
import { registerUser } from "../component/slice/registerSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { getUser } from "../component/slice/getUserProfileSlice";
import { profileUpdatedApi } from "../component/slice/profileUpdatedSlice";
import { myOrderDetailsApi } from "../component/slice/myOrderListSlice";
import { LinkContainer } from "react-router-bootstrap";
export const UserProfileScreen = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const registerData = useSelector((p) => p.userDetails);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { password, confirmPassword } = formData;
  const userData = useSelector((p) => p.loginUser);
  const myOrders = useSelector((p) => p.myOrder);
  const { userInfo } = userData;
  const { isError, isLoading, user } = registerData;
  const { isError: errorMyOrders, isLoading: loadingMyOrders, order } = myOrders;
  // console.log(user, "any name filled");
  // console.log(isError, "is error from login");

  useEffect(() => {
    if (!userInfo) {
      navigation("/login");
    } else {
      if (!user.name) {
        dispatch(getUser());
        dispatch(myOrderDetailsApi())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigation, user]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onNameHandler = (e) => {
    setName(e.target.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Does Not Match");
    } else {
      dispatch(profileUpdatedApi({ _id: user._id, name, email, password }));
    }
    setName('');
    setEmail('');
    setFormData({ password: "", confirmPassword: "" });
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <h1 style={{ margin: "1rem 0" }}>Profile Update</h1>
            {message && <Message variant="danger">{message}</Message>}
            {isError && <Message variant="danger">{isError}</Message>}

            {isLoading && <Loader />}
            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => onNameHandler(e)}
                  />
                  <label className="form-label">Name</label>
                </div>
              </div>
            </div>

            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input
                type="email"
                className="form-control"
                // name="email"
                value={email}
                onChange={(e) => onEmailHandler(e)}
              />
              <label className="form-label">Email address</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => onChangeHandler(e)}
              />
              <label className="form-label">Password</label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChangeHandler(e)}
              />
              <label className="form-label">Confirm Password</label>
            </div>
            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Filled Update
            </button>
          </form>
        </Col>
        <Col md={9}>
          <h1>MY ORDERS</h1>
          <Table className="table-sm" responsive hover bordered striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>PRODUCT</th>
              </tr>
            </thead>
            <tbody>
              {order.map((p) =>
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{(p.createdAt).substring(0, 10)}</td>
                  <td>{p.totalPrice}</td>

                  <td>{p.isPaid ? p.paidAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: "red" }}>

                    </i>
                  )}</td>
                  <td>{p.isDelivered ? p.deliveredAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: "red" }}>

                    </i>
                  )}</td>
                  <td>
                    <LinkContainer to={`/order/${p._id}`}>
                      <Button className="btn-sm btn-light btn-block">
                        Details
                      </Button>
                    </LinkContainer>


                  </td>
                </tr>
              )}

            </tbody>

          </Table>
        </Col>
      </Row>
    </>
  );
};
