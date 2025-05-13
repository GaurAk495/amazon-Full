import "../pages/css/checkout-header.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function CheckoutHeader() {
  const cart = useSelector((store) => store.cart);
  const cartQunatity = cart.length;
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <NavLink to="/">
              <img className="amazon-logo" src="images/amazon-logo.png" />
              <img
                className="amazon-mobile-logo"
                src="images/amazon-mobile-logo.png"
              />
            </NavLink>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <NavLink className="return-to-home-link" to="/">
              {cartQunatity} items
            </NavLink>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutHeader;
