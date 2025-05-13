import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { addtoCart } from "../store/cartSlice";

function OrderDetailsGrid({ orderProduct, orderId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buyItAgain = async (productId) => {
    try {
      const data = await apiClient.post("/user/addtocart", {
        productId,
        quantity: 1,
      });

      const { success, error, message, cartItem } = data;
      if (success) {
        dispatch(addtoCart(cartItem));
      } else {
        console.error("Failed to add to cart:", message || error);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  const productDeliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format(
    "MMMM D"
  );
  const productQuantity = orderProduct.quantity;

  const trackPackage = (orderId, productId) => {
    navigate(`/tracking?orderId=${orderId}&productId=${productId}`);
  };

  return (
    <>
      <div className="product-image-container">
        <img src={orderProduct.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{orderProduct.product.name}</div>
        <div className="product-delivery-date">
          Arriving on: {productDeliveryDate}
        </div>
        <div className="product-quantity">Quantity: {productQuantity}</div>
        <button
          className="buy-again-button button-primary"
          onClick={() => {
            buyItAgain(orderProduct.product._id);
          }}
        >
          <img className="buy-again-icon" src="images/icons/buy-again.png" />
          <span className="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div className="product-actions">
        <button
          className="track-package-button button-secondary"
          onClick={() => trackPackage(orderId, orderProduct.product._id)}
        >
          Track package
        </button>
      </div>
    </>
  );
}
export default OrderDetailsGrid;
