import React, { useState } from "react";
import { connect } from "react-redux";
import {
  AddToCart,
  removeFromCart,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";
import { getCartTotal } from "../../redux/cart/cart.utils";
import { placeOrder } from "../../redux/order/order.actions";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import "./CartPage.css";

const CartPage = ({
  cartItems,
  user,
  AddToCart,
  removeFromCart,
  clearItemFromCart,
  placeOrder,
  history,
}) => {
  const [roomNo, setRoomNo] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const orderDetails = {
      cart: cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        foodType: item.foodType,
        price: item.price * item.quantity,
        quantity: item.quantity,
      })),
      roomNo: roomNo,
      message: message,
      totalPrice: getCartTotal(cartItems),
    };

    placeOrder(orderDetails, history);
  };

  return (
    <>
      <div className="table-div">
        {cartItems.length > 0 ? (
          <table className="table">
            <tr>
              <th>Image</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>

            {cartItems.map((cartItem) => (
              <tr>
                {console.log(cartItems)}
                <td>
                  <img alt={cartItem?.name} src={cartItem.image} />
                </td>
                <td>{cartItem?.name}</td>
                {console.log(typeof cartItem.price)}
                <td>₹{cartItem?.price * cartItem?.quantity}</td>
                <td>{cartItem?.quantity}</td>
                <td>
                  <button className="add" onClick={() => AddToCart(cartItem)}>
                    <GrAdd className="icon" />
                  </button>
                  <button
                    className="minus"
                    onClick={() => removeFromCart(cartItem)}
                  >
                    <GrSubtract className="icon" />
                  </button>
                  <button
                    className="remove"
                    onClick={() => clearItemFromCart(cartItem?._id)}
                  >
                    <ImCross />
                  </button>
                </td>
              </tr>
            ))}

            {user?.role === "teacher" && (
              <div className="teacher">
                <h2>If you want delivery at your place</h2>
                <input
                  type="text"
                  name="roomNo"
                  value={roomNo}
                  placeholder="Room No"
                  onChange={(e) => setRoomNo(e.target.value)}
                />
                <br />
                <textarea
                  placeholder="Enter your message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            )}
            <div className="cart-total">
              <h3>Total price: ₹{getCartTotal(cartItems)}</h3>
              <button onClick={onSubmit}>Place Order</button>
            </div>
          </table>
        ) : (
          <h1>Cart is empty</h1>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  AddToCart,
  removeFromCart,
  clearItemFromCart,
  placeOrder,
})(CartPage);
