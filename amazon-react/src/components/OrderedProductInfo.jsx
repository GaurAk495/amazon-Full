import { NavLink, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

function OrderedProductInfo() {
  const orderList = useSelector((store) => store.order.orderList);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { orderId, productId } = Object.fromEntries(query);

  if (!orderList || orderList.length === 0) {
    return <div className="loader">Loading orders...</div>;
  }
  console.log(orderList);

  const matchingOrder = orderList.find((oItem) => oItem._id === orderId);
  if (!matchingOrder) {
    return <div className="error">Order not found</div>;
  }

  const matchingProduct = matchingOrder.products.find(
    (pItem) => pItem.product._id === productId
  );
  if (!matchingProduct) {
    return <div className="error">Product not found in this order</div>;
  }

  const formatDate = () => {
    return dayjs(matchingProduct.estimatedDeliveryTime).format("dddd D MMMM");
  };

  const dateOfOrder = new Date(matchingOrder.orderTime);
  const dateOfArriving = new Date(matchingProduct.estimatedDeliveryTime);
  const currentDate = new Date();

  const totalDuration = dateOfArriving - dateOfOrder;
  const elapsed = currentDate - dateOfOrder;

  let progressWidth = elapsed / totalDuration;
  progressWidth = Math.max(0, Math.min(progressWidth, 1));

  return (
    <div className="tracking-main">
      <div className="order-tracking">
        <NavLink className="back-to-orders-link link-primary" to="/order">
          View all orders
        </NavLink>

        <div className="delivery-date">Arriving on {formatDate()}</div>
        <div className="product-info">Quantity: {matchingProduct.quantity}</div>
        <img className="product-image" src={matchingProduct.product.image} />

        <div className="progress-labels-container">
          <div className="progress-label">Preparing</div>
          <div className="progress-label current-status">Shipped</div>
          <div className="progress-label">Delivered</div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressWidth * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OrderedProductInfo;
