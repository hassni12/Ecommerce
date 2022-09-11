import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { shippingAddressReducer } from "../component/slice/cartSlice";
import { CheckoutSteps } from "../component/CheckoutSteps";
export const ShippingScreen = () => {


  const { shippingAddress } = useSelector((p) => p.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  //   console.log(address);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingAddressReducer({address, city, postalCode, country }));
    navigation("/payment")
  };
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <h1 style={{ margin: "1rem 0" }}>SHIPPING</h1>

        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <input
                type="text"
                className="form-control"
                name="name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="form-label">Address</label>
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            name="email"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label className="form-label">City</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            name="password"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <label className="form-label">Postal Code</label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label className="form-label">Country</label>
        </div>
        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};
