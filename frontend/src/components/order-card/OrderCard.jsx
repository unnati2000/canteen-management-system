import React from "react";
import { connect } from "react-redux";
import {
  confirmOrder,
  setpaymentStatus,
  setpaymentType,
} from "../../redux/order/order.actions";
import StripeButton from "../../components/stripe-button/StripeButton";
import "./OrderCard.css";

const OrderCard = ({
  order,
  user,
  confirmOrder,
  setpaymentType,
  setpaymentStatus,
  history,
}) => {
  return (
    <div className="order-card">
      <h3>Order Id: {order?._id}</h3>

      {order?.orders.map((ord) => (
        <div className="ordered-food" key={order?._id}>
          <img alt={ord?.name} src={ord?.image} />
          <p>{ord?.name}</p>
          <p>{ord?.quantity}</p>
          <p>₹{ord?.price}</p>
        </div>
      ))}

      <p>
        <b>Total Price: </b>₹{order?.totalPrice}
      </p>
      <p>
        <b>Status: </b>
        {order?.isConfirmed !== null ? (
          order?.isConfirmed === true ? (
            <span className="accepted-span">Accepted</span>
          ) : (
            <span className="rejected-span">Rejected</span>
          )
        ) : (
          <span className="notConfirm-span">Not confirmed yet</span>
        )}
      </p>

      {order?.paymentStatus === true ? (
        <p>
          <b>Payment Status: </b>
          <span className="accepted-span">Paid</span>
        </p>
      ) : (
        order?.isConfirmed &&
        !user?.isAdmin &&
        (order?.paymentType === "" ? (
          <>
            <h3>Choose your payment method</h3>
            <div className="payment-button">
              <button
                className="online-btn"
                onClick={() => setpaymentType(order?._id, "online", history)}
              >
                Online
              </button>
              <button
                className="offline-btn"
                onClick={() => setpaymentType(order?._id, "offline", history)}
              >
                Cash
              </button>
            </div>
          </>
        ) : order?.paymentType === "online" ? (
          <StripeButton price={order?.totalPrice} id={order?._id} />
        ) : (
          "You have to in Cash"
        ))
      )}
      {user?.isAdmin && (
        <div>
          <h4>User details</h4>
          <div className="user-details">
            <p>Name: {order?.user?.name}</p>
            <p>Branch: {order?.user?.branch}</p>
          </div>
          <p>Role: {order?.user?.role}</p>
        </div>
      )}

      {order?.user?.role === "teacher" && (
        <div>
          <p>
            <b>Room No: </b>
            {order?.roomNo}
          </p>
          <p>
            <b>Message: </b> {order?.message}
          </p>
        </div>
      )}

      {user?.isAdmin && order?.isConfirmed === null && (
        <div className="admin-buttons">
          <button
            className="accept"
            onClick={() => confirmOrder(order?._id, true, history)}
          >
            Accept
          </button>
          <button
            className="reject"
            onClick={() => confirmOrder(order?._id, false, history)}
          >
            Reject
          </button>
        </div>
      )}

      {user?.isAdmin &&
      order?.isConfirmed &&
      order?.paymentType === "offline" &&
      order?.paymentStatus === false ? (
        <button
          className="payment-done"
          onClick={() => setpaymentStatus(order?._id, history)}
        >
          Payment Done
        </button>
      ) : (
        ""
      )}

      {order?.paymentType && (
        <p>
          <b>Payment Type:</b> {order?.paymentType}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  confirmOrder,
  setpaymentType,
  setpaymentStatus,
})(OrderCard);
