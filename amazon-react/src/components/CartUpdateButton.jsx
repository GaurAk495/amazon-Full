import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQty, deleteItem } from "../store/cartSlice";
import { apiClient } from "../utils/apiClient";

function CartUpdateButton({ itemDetail }) {
  const inputQtyElem = useRef();
  const [isUserChangingQuantity, setUserChangingQuantity] = useState(false);
  const dispatch = useDispatch();

  const updateQty = () => {
    setUserChangingQuantity(true);
  };

  const saveQty = async (cartId) => {
    try {
      if (!cartId) {
        console.warn("No cartId provided to saveQty.");
        return;
      }

      const qtyValue = inputQtyElem.current?.value;

      if (!qtyValue || isNaN(qtyValue)) {
        console.warn("Invalid quantity value:", qtyValue);
        return;
      }

      const newQty = Number(qtyValue);

      const { success, message, error, updatedCart } = await apiClient.post(
        "/user/newquantity",
        {
          cartId,
          newQty,
        }
      );

      if (success && updatedCart) {
        dispatch(
          updateCartQty({
            cartId: updatedCart._id,
            newQty: updatedCart.quantity,
          })
        );
      } else {
        console.error(
          "Failed to update quantity:",
          message || error || "Unknown error"
        );
      }
    } catch (err) {
      console.error("Error while updating cart quantity:", err.message || err);
    } finally {
      setUserChangingQuantity(false);
    }
  };

  const deleteItemCart = async (cartId) => {
    try {
      if (!cartId) {
        console.warn("No cartId provided to deleteItemCart.");
        return;
      }

      const response = await apiClient.post("/user/deleteCart", { cartId });
      const { success, message, error } = response;

      if (success) {
        dispatch(deleteItem(cartId));
      } else {
        console.error(
          "Server error:",
          message || error || "Unknown error occurred."
        );
      }
    } catch (err) {
      console.error("Network or server failure:", err.message || err);
    }
  };

  return (
    <>
      <span>Quantity: &nbsp;</span>
      {isUserChangingQuantity ? (
        <>
          <input
            type="number"
            className="update-quantity-input border-[1px]"
            defaultValue={itemDetail.quantity}
            ref={inputQtyElem}
          />
          &nbsp;
          <span
            className="save-quantity-link link-primary"
            onClick={() => {
              saveQty(itemDetail._id);
            }}
          >
            Save
          </span>
        </>
      ) : (
        <>
          <span className="quantity-label">{itemDetail.quantity}</span>&nbsp;
          <span
            className="update-quantity-link link-primary"
            onClick={updateQty}
          >
            Update
          </span>
        </>
      )}
      <span
        className="delete-quantity-link link-primary"
        onClick={() => {
          deleteItemCart(itemDetail._id);
        }}
      >
        Delete
      </span>
    </>
  );
}

export default CartUpdateButton;
