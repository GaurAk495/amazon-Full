import dayjs from "dayjs";
import OrderDetailsGrid from "./OrderDetailsGrid";
function OrderItem({ orderDetail }) {
  const orderPlaced = dayjs(orderDetail.orderTime).format("MMMM D");
  const total = (orderDetail.totalCostCents / 100).toFixed(2);

  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{orderPlaced}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>${total}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{orderDetail._id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {orderDetail.products.map((cart) => {
          return (
            <OrderDetailsGrid
              key={cart._id}
              orderProduct={cart}
              orderId={orderDetail._id}
            />
          );
        })}
      </div>
    </div>
  );
}
export default OrderItem;
