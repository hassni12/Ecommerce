import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import Loader from "../component/Loader";
import Message from "../component/Message";
import { FormContainer } from "../component/FormContainer";
import {authUser} from "../component/slice/userSlice";
// userSlice
export const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((p) => p.loginUser);
  console.log(userData);
const redirect=location.search?location.search.split('=')[1]:"/"
const {isError,isLoading,userInfo}=userData
  useEffect(()=>{
    if (userInfo){
        navigation(redirect)
    }
},[userInfo,redirect,navigation]
)

console.log(isError,"is error from login")


const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

const onSubmitHandler=(e)=>{
  e.preventDefault()
  dispatch(authUser({email,password}))
}

  return (
    <FormContainer>
      <h1 style={{margin:"1rem 0"}}>SIGN IN</h1>
      {isError&& <Message variant='danger'>{isError}</Message>}
      {isLoading&& <Loader/>}
      <form onSubmit={(e)=>onSubmitHandler(e)}>
        <div className="form-outline mb-4">
          <input
            type="email"
            placeholder="Enter your Email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => onChangeHandler(e)}
          />
          <label className="form-label">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => onChangeHandler(e)}
          />
          <label className="form-label">Password</label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
              <label className="form-check-label"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <Link to="#!">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to={redirect?`/register?redirect=${redirect}`:"/register"}  >Register</Link>
          </p>
          <p>or sign up with:</p>
        </div>
      </form>
    </FormContainer>

    // <FormContainer>
    //   <Form>
    //     <Form.Group>
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control onChange={(e)=>onchangeHandler(e)} type="email" placeholder="Enter your email address" name="email" value={email}></Form.Control>
    //     </Form.Group>
    //     <Form.Group>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control onChange={(e)=>onchangeHandler(e)} type="password" placeholder="Enter your password" name="password" value={password}  ></Form.Control>
    //     </Form.Group>
    //   </Form>
    // </FormContainer>
  );
};
