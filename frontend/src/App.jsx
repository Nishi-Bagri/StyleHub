import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public Pages
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Wishlist from "./pages/Wishlist/Wishlist";

// User Dashboard
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import DashboardHome from "./pages/UserDashboard/DashboardHome";
import Profile from "./pages/UserDashboard/Profile";
import ChangePassword from "./pages/UserDashboard/ChangePassword";
import MyOrders from "./pages/UserDashboard/MyOrders";

// Admin Dashboard
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminDashboardHome from "./pages/AdminDashboard/DashboardHome";
import AdminProducts from "./pages/AdminDashboard/Products";
import AdminCategories from "./pages/AdminDashboard/Categories";
import AdminOrders from "./pages/AdminDashboard/Orders";
import AdminUsers from "./pages/AdminDashboard/Users";
import AdminPayments from "./pages/AdminDashboard/Payments";
import AdminReports from "./pages/AdminDashboard/Reports";
import AdminSettings from "./pages/AdminDashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with Layout */}
        <Route element={<Layout />}>

          {/* ================= PUBLIC ROUTES ================= */}

          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/products/:id" element={<ProductDetails />} />


          {/* ================= PROTECTED ROUTES ================= */}

          <Route element={<ProtectedRoute />}>

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />

            {/* Orders */}
            <Route path="/orders" element={<Orders />} />

            <Route path="/orders/:id" element={<OrderDetails />} />

            {/* Wishlist */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Checkout */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Payment */}
            <Route path="/payment" element={<Payment />} />

            {/* Payment Success */}
            <Route
              path="/payment-success"
              element={<PaymentSuccess />}
            />


            {/* ================= USER DASHBOARD ================= */}

            <Route
              path="/user/dashboard"
              element={<UserDashboard />}
            >
              <Route index element={<DashboardHome />} />

              <Route
                path="profile"
                element={<Profile />}
              />

              <Route
                path="orders"
                element={<MyOrders />}
              />

              <Route
                path="wishlist"
                element={<Wishlist />}
              />

              <Route
                path="change-password"
                element={<ChangePassword />}
              />
            </Route>

          </Route>


          {/* ================= ADMIN DASHBOARD ================= */}

          {/* 
            Admin routes are NOT protected by AdminRoute yet.
            We will add AdminRoute after testing ProtectedRoute.
          */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          >
            <Route
              index
              element={<AdminDashboardHome />}
            />

            <Route
              path="products"
              element={<AdminProducts />}
            />

            <Route
              path="categories"
              element={<AdminCategories />}
            />

            <Route
              path="orders"
              element={<AdminOrders />}
            />

            <Route
              path="users"
              element={<AdminUsers />}
            />

            <Route
              path="payments"
              element={<AdminPayments />}
            />

            <Route
              path="reports"
              element={<AdminReports />}
            />

            <Route
              path="settings"
              element={<AdminSettings />}
            />
          </Route>

        </Route>


        {/* ================= AUTHENTICATION ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;