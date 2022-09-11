import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./screen/HomeScreen";
import { Routes, Route, Link } from "react-router-dom";
import { ProductScreen } from "./screen/ProductScreen";
import { CartScreen } from "./screen/CartScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./component/NotFound";
import { LoginScreen } from "./screen/LoginScreen";
import { RegisterScreen } from "./screen/RegisterScreen";
import { UserProfileScreen } from "./screen/UserProfileScreen";
import { ShippingScreen } from "./screen/ShippingScreen";
import { PaymentScreen } from "./screen/PaymentScreen";
import { PlaceOrderScreen } from "./screen/PlaceOrderScreen";
import { OrderDetailScreen } from "./screen/OrderDetailScreen";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <main className="py-3">
          {/* <h1>Eshop app</h1> */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen/>}/>
            
            <Route path="/payment" element={<PaymentScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/order/:id" element={<OrderDetailScreen/>}/>
            <Route path="/login/shipping" element={<ShippingScreen/>}/>

            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/profile" element={<UserProfileScreen/>}/>
            
            <Route path="products/:id" element={<ProductScreen />} />
            <Route path="/cart/*" element={<CartScreen />}>
              <Route path=":id" element={<CartScreen />} />
            </Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </main>
      </Container>

      <Footer />
      {/* </Routes> */}
    </div>
  );
}

export default App;
