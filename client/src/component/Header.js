import React from "react";
import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slice/userSlice";
import { refreshUserOrder } from "./slice/myOrderListSlice";
import { refreshUserProfile } from "./slice/getUserProfileSlice";
import { refreshAdminGetUser } from "./slice/adminUserGetSlice";
import { removeRegisterInformation } from "./slice/registerSlice";
import { resetAdminProduct } from "./slice/adminProductsSlice";
// removeRegisterInformation
// resetAdminProduct
export const Header = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((p) => p.loginUser);
  const { userInfo } = userData;

  const logoutHandler = () => {

    dispatch(logout())
    dispatch(refreshUserOrder())
    dispatch(refreshUserProfile({}))
    dispatch(refreshAdminGetUser())
    dispatch(removeRegisterInformation())
    dispatch(resetAdminProduct())
    navigation('/login')


    //  navigation('/')
  }

  return (
    <div>
      <Navbar bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        {/* <Container className="mr-auto"> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={() => logoutHandler()}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <NavDropdown
                  title="Admin"
                  style={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  <LinkContainer to="admin/userslist">
                    <NavDropdown.Item>USERS</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/productlist">
                    <NavDropdown.Item>PRODUCT</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/orderlist">
                    <NavDropdown.Item>ORDERS</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

              </>

            )}
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
};
