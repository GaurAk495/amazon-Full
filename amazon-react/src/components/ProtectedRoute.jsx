import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCart } from "../store/cartSlice";
import { fetchingOrder } from "../store/OrderSlice";
import { useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((store) => store.logStaus.status);

  // Fetching User Orders List
  useEffect(() => {
    const orderPlaced = async () => {
      try {
        const data = await apiClient.post("/user/ordered-items");
        const { success, error, message, Orders } = data;
        if (success) {
          dispatch(fetchingOrder(Orders));
        } else if (error) {
          console.log(message);
        }
      } catch (error) {
        console.error("Error placing order:", error.message);
        console.error("Error type:", error?.name);
      }
    };
    orderPlaced();
  }, []);
  //fetching User Cart List
  useEffect(() => {
    const cartFetching = async () => {
      try {
        const data = await apiClient.post("/user");
        const { success, message, error, cartItems } = data;

        if (!success) {
          console.warn("⚠️ Cart fetch failed:", message || error);
          return;
        }
        dispatch(fetchCart(cartItems));
      } catch (err) {
        console.error("❌ API error during cart fetch:", err.message);
      }
    };
    cartFetching();
  }, []);

  if (isUserLoggedIn) {
    return children;
  }
  return <Navigate to="/login" />;
}
