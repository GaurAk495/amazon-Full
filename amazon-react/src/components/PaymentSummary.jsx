import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder, userPlacingOrder } from "../store/OrderSlice";
import { emptyCart } from "../store/cartSlice";
import { apiClient } from "../utils/apiClient";

function PaymentSummary() {
  const cart = useSelector((store) => store.cart);
  const [PaymentDetails, setPaymentDetails] = useState();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  if (!cart) {
    return <p> Loading</p>;
  }
  let itemsPriceinCents = 0;
  let shippingHandlinginCents = 0;

  useEffect(() => {
    cart.forEach((cItem) => {
      itemsPriceinCents += cItem.productId.priceCents * cItem.quantity;
      shippingHandlinginCents += cItem.deliveryOptionId.priceCents;
    });

    const itemsPrice = itemsPriceinCents / 100;
    const shippingHandling = shippingHandlinginCents / 100;
    const totalBeforeTaxinCents = itemsPriceinCents + shippingHandlinginCents;
    const totalBeforeTax = totalBeforeTaxinCents / 100;
    const taxIncents = (totalBeforeTaxinCents * 10) / 100;
    const tax = taxIncents / 100;
    const orderTotal =
      (itemsPriceinCents + shippingHandlinginCents + taxIncents) / 100;

    setPaymentDetails({
      itemsPrice,
      shippingHandling,
      totalBeforeTax,
      tax,
      orderTotal,
    });
  }, [cart]);

  const orderPlaced = async () => {
    try {
      dispatch(userPlacingOrder(true));
      const data = await apiClient.post("/user/orders", { cartItems: cart });
      const { success, error, message, orderArray } = data;
      if (success) {
        dispatch(placeOrder(orderArray));
        dispatch(emptyCart());
        Navigate("/order");
      } else if (error) {
        console.log(message);
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      console.error("Error type:", error.name);
      dispatch(userPlacingOrder(false));
    }
  };

  return (
    PaymentDetails && (
      <div className="payment-summary">
        <div className="payment-summary-title">Order Summary</div>

        <div className="payment-summary-row">
          <div>Items ({cart.length}):</div>
          <div className="payment-summary-money">
            ${PaymentDetails.itemsPrice.toFixed(2)}
          </div>
        </div>

        <div className="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div className="payment-summary-money">
            ${PaymentDetails.shippingHandling.toFixed(2) || "0.00"}
          </div>
        </div>

        <div className="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div className="payment-summary-money">
            ${PaymentDetails.totalBeforeTax.toFixed(2)}
          </div>
        </div>

        <div className="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div className="payment-summary-money">
            ${PaymentDetails.tax.toFixed(2)}
          </div>
        </div>

        <div className="payment-summary-row total-row">
          <div>Order total:</div>
          <div className="payment-summary-money">
            ${PaymentDetails.orderTotal.toFixed(2)}
          </div>
        </div>

        <button
          className="place-order-button button-primary"
          onClick={orderPlaced}
        >
          Place your order
        </button>
      </div>
    )
  );
}
export default PaymentSummary;
