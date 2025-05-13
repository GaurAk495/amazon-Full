import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../utils/apiClient";
import { addtoCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductContainer({ product }) {
  const isLogged = useSelector((store) => store.logStaus.status);
  const productQuantityElem = useRef();
  const notificationElem = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSizeChartFor = ["hoodies", "sweaters", "apparel", "womens", "men"];
  let TimeoutId;

  async function addProductInCart(productId) {
    if (!isLogged) {
      navigate("/login");
    }
    try {
      // Clear existing timeout and hide notification if visible
      if (TimeoutId) {
        clearTimeout(TimeoutId);
        notificationElem.current.style.opacity = 0;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const productQty = productQuantityElem.current.value;
      notificationElem.current.style.opacity = 1;
      // Send POST request to add product
      const data = await apiClient.post("/user/addtocart", {
        productId,
        quantity: Number(productQty),
      });
      const { success, error, message, cartItem } = data;
      if (success) {
        dispatch(addtoCart(cartItem));
      } else {
        console.error("Failed to add to cart:", message || error);
      }

      // Set a timeout to hide the notification
      TimeoutId = setTimeout(() => {
        notificationElem.current.style.opacity = 0;
      }, 2000);
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  }

  useEffect(() => {
    return () => {
      if (TimeoutId) {
        clearTimeout(TimeoutId);
      }
      if (notificationElem.current) {
        notificationElem.current.style.opacity = 0;
      }
    };
  }, []);

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name ">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">${product.priceCents / 100}</div>

      <div className="product-quantity-container">
        <select defaultValue={1} ref={productQuantityElem}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      {product.keywords.some((kw) => showSizeChartFor.includes(kw)) && (
        <div>
          <a
            href="/images/clothing-size-chart.png"
            target="_blank"
            className="text-blue-500 underline hover:text-blue-900 transition-alls duration-500"
          >
            Size Chart
          </a>
        </div>
      )}
      <div className="product-spacer"></div>

      <div className="added-to-cart" ref={notificationElem}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={() => addProductInCart(product._id)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductContainer;
