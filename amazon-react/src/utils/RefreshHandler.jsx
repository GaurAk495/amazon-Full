import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RefreshHandler({ children }) {
  const isUserLoggedIn = useSelector((store) => store.logStaus.status);
  return isUserLoggedIn ? <Navigate to="/" /> : children;
}
