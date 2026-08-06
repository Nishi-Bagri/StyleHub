import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import DashboardHome from "./pages/UserDashboard/DashboardHome";
import Profile from "./pages/UserDashboard/Profile";
import ChangePassword from "./pages/UserDashboard/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with Navbar + Announcement Bar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:id" element={<OrderDetails />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/user/dashboard" element={<UserDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Checkout Flow (No Navbar/Footer) */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
