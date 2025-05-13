import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./Loader";
import { userPlacingOrder } from "../store/OrderSlice";

function OrderContainer() {
  const dispatch = useDispatch();
  const orderList = useSelector((store) => store.order.orderList);
  const fetched = useSelector((store) => store.fetching.fetchedProducts);

  console.log(orderList);

  useEffect(() => {
    dispatch(userPlacingOrder(false));
  }, []);

  return !fetched ? (
    <Loader />
  ) : (
    <div className="order-main">
      <div className="page-title">Your Orders</div>
      <div className="orders-grid">
        {orderList.map((orderItem) => {
          return <OrderItem key={orderItem._id} orderDetail={orderItem} />;
        })}
      </div>
    </div>
  );
}
export default OrderContainer;
