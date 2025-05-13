import { useDispatch } from "react-redux";
import { deliveryUpdate } from "../store/cartSlice";
import dayjs from "dayjs";
import { apiClient } from "../utils/apiClient";

function DeliveryOptions({ deliveryDetail, cartDeliveryInfo }) {
  const dispatch = useDispatch();

  const updateDelivery = async (cartId, newDeliveryId) => {
    try {
      const data = await apiClient.post("/user/delivery", {
        cartId,
        updatedDelivey: newDeliveryId,
      });
      const { success, message, updatedCart, error } = data;
      if (!success || !updatedCart) {
        console.warn("⚠️ Failed to update delivery:", message || error);
        return;
      }
      dispatch(deliveryUpdate(updatedCart));
    } catch (err) {
      console.error("❌ updateDelivery error:", err.message);
    }
  };

  function dateFormat(dDate) {
    const now = dayjs();
    return now.add(dDate, "day").format("dddd, MMM DD");
  }

  const deliveryCharge =
    deliveryDetail.priceCents === 0
      ? "FREE"
      : (deliveryDetail.priceCents / 100).toFixed(2);

  return (
    <div
      className="delivery-option gap-2"
      onClick={() => updateDelivery(cartDeliveryInfo._id, deliveryDetail._id)}
    >
      <input
        type="radio"
        className="delivery-option-input"
        checked={deliveryDetail._id === cartDeliveryInfo.deliveryOptionId._id}
        readOnly
      />

      <div>
        <div className="delivery-option-date">
          {dateFormat(deliveryDetail.days)}
        </div>
        <div className="delivery-option-price">{deliveryCharge} Shipping</div>
      </div>
    </div>
  );
}

export default DeliveryOptions;
