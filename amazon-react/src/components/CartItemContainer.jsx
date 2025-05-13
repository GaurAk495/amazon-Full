import { useSelector } from "react-redux";
import CartUpdateButton from "./CartUpdateButton";
import DeliveryOptions from "./deliveryOptions";
import dayjs from "dayjs";

function CartItemContainer({ itemDetail }) {
  const deliveryOptions = useSelector((store) => store.delivery);
  const products = useSelector((store) => store.products);

  if (!deliveryOptions) {
    return <p>Loading</p>;
  }

  function dateFormat(Ddate) {
    const now = dayjs();
    const deliveryDate = now.add(Ddate, "day").format("dddd, MMM DD");
    return deliveryDate;
  }

  const matchingDeliveryOption = deliveryOptions.find((item) => {
    return item._id === itemDetail.deliveryOptionId._id;
  });

  const matchingproduct = products.find(
    (item) => item._id === itemDetail.productId._id
  );
  return (
    <>
      <div className="cart-item-container">
        <div className="delivery-date">
          Delivery date: {dateFormat(matchingDeliveryOption.days)}
        </div>

        <div className="cart-item-details-grid">
          <img className="product-image-cart" src={matchingproduct.image} />

          <div className="cart-item-details">
            <div className="product-name">{matchingproduct.name}</div>
            <div className="product-price">
              ${matchingproduct.priceCents / 100}
            </div>
            <div className="product-quantity">
              <CartUpdateButton itemDetail={itemDetail} />
            </div>
          </div>

          <div className="delivery-options">
            <div className="delivery-options-title">
              Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryItem) => {
              return (
                <DeliveryOptions
                  key={deliveryItem._id}
                  cartDeliveryInfo={itemDetail}
                  deliveryDetail={deliveryItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItemContainer;
