import { useSelector } from "react-redux";
import CartItemContainer from "./CartItemContainer";
import PaymentSummary from "./PaymentSummary";
import Loader from "./Loader";
import CartEmptyDisplay from "./CartEmptyDisplay";

function CheckoutItemsContainer() {
  const cartItems = useSelector((store) => store.cart);
  const userPlacedOrder = useSelector((store) => store.order.orderPlacing);
  const fetched = useSelector((store) => store.fetching.fetchedProducts);
  return (
    <div className="main-checkout ">
      {userPlacedOrder || !fetched ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <CartEmptyDisplay />
      ) : (
        <div>
          <div className="page-title">Review your order</div>
          <div className="checkout-grid">
            <div className="order-summary">
              {cartItems.map((item) => (
                <CartItemContainer key={item._id} itemDetail={item} />
              ))}
            </div>
            <PaymentSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutItemsContainer;
