import { NavLink, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
// import { useRef } from "react";
function OrderedProductInfo() {
  // const fetched = useSelector((store) => store.fetching.fetchedProducts);
  const orderList = useSelector((store) => store.order.orderList);
  const products = useSelector((store) => store.products);

  console.log(orderList);
  //extracting params from url
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { orderId, productId } = Object.fromEntries(query);

  //finding matchingOrder from OrderList
  const matchingOrder = orderList.find((orderDetail) => {
    return orderDetail._id === orderId;
  });
  //finding the products details availble in OrderedItemList
  const matchingOrderedProduct = matchingOrder?.products.find((product) => {
    return product.productId._id === productId;
  });
  //searching product other information from products array
  const matchingProduct = products.find((product) => product._id === productId);
  //delivery Date Formatted
  const deliveryDate = dayjs(
    matchingOrderedProduct?.estimatedDeliveryTime
  ).format("dddd MMMM D");
  // delivery progress finding
  const now = dayjs();
  const orderTime = dayjs(matchingOrder?.orderTime);
  const deliveryTime = dayjs(matchingOrderedProduct?.estimatedDeliveryTime);
  const totalDuration = deliveryTime.diff(orderTime);
  const timeElapsed = now.diff(orderTime);
  const progressPercent = Math.min(
    100,
    Math.max(0, (timeElapsed / totalDuration) * 100)
  );
  return (
    <div className="tracking-main">
      <div className="order-tracking">
        <NavLink className="back-to-orders-link link-primary" to="/order">
          View all orders
        </NavLink>

        <div className="delivery-date">Arriving on Monday, {deliveryDate}</div>

        <div className="product-info">{matchingProduct.name}</div>

        <div className="product-info">
          Quantity: {matchingOrderedProduct.quantity}
        </div>

        <img className="product-image" src={matchingProduct.image} />

        <div className="progress-labels-container">
          <div className="progress-label">Preparing</div>
          <div className="progress-label current-status">Shipped</div>
          <div className="progress-label">Delivered</div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OrderedProductInfo;
