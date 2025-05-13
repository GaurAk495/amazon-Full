import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx";
import Tracking from "./pages/Tracking.jsx";
import LoginPage from "./pages/Login.jsx";
import SignUpPage from "./pages/signUp.jsx";
import RefreshHandler from "./utils/RefreshHandler.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "./store/LogStatusSlice.js";
import { apiClient } from "./utils/apiClient.js";
import { fetchDelivey } from "./store/deliverySlice.js";
import { loadProducts } from "./store/ProductSlice";
import { fetchedStatus, fetchingStatus } from "./store/FetchingSlice";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function userLogStatus() {
      try {
        const data = await apiClient.post("/api/auth/valid");
        const { success, message, user } = data;
        console.log({ success, message, user });
        if (success) {
          dispatch(setUserLoginStatus({ isLoggedIn: true, userInfo: user }));
        } else {
          console.log(message);
        }
      } catch (err) {
        dispatch(setUserLoginStatus({ isLoggedIn: false, userInfo: "false" }));
      }
    }
    userLogStatus();
  }, []);
  // fetching Products
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetching = async () => {
      dispatch(fetchingStatus());

      const data = await apiClient.get("/products");
      dispatch(loadProducts(data));
      dispatch(fetchedStatus());
    };
    fetching();
    return () => {
      controller.abort();
    };
  }, []);
  //fetching DeliveryOptions List
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const data = await apiClient.get("/shipmethod");
        const { success, deliveryOptions, message, error } = data;

        if (!success) {
          console.warn(
            "⚠️ Failed to fetch delivery options:",
            message || error
          );
          return;
        }
        dispatch(fetchDelivey(deliveryOptions));
      } catch (err) {
        console.error(
          "❌ Network error while fetching delivery options:",
          err.message
        );
      }
    };

    fetchDeliveryOptions();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<RefreshHandler children={<LoginPage />} />}
        />
        <Route
          path="/signup"
          element={<RefreshHandler children={<SignUpPage />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute children={<Checkout />} />}
        />
        <Route
          path="/order"
          element={<ProtectedRoute children={<Order />} />}
        />
        <Route
          path="/tracking"
          element={<ProtectedRoute children={<Tracking />} />}
        />
      </Routes>
    </>
  );
}

export default App;
