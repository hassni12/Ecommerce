import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../component/slice/registerSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
export const RegisterScreen = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const registerData = useSelector((p) => p.registerUser);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const { name, email, password, confirmPassword } = formData;
  console.log(registerData);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { isError, isLoading, userInfo } = registerData;
  console.log(isError, "is error from login");
  useEffect(() => {
    if (userInfo) {
      navigation(redirect);
    }
  }, [userInfo, redirect, navigation]);
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Does Not Match");
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };
  return (
    <FormContainer>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <h1 style={{ margin: "1rem 0" }}>SIGN UP</h1>
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
                name="name"
                value={name}
                onChange={(e) => onChangeHandler(e)}
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
            name="email"
            value={email}
            onChange={(e) => onChangeHandler(e)}
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
          Sign up
        </button>
        <div className="text-center">
          <p>
            Already register?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              LogIn
            </Link>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};
