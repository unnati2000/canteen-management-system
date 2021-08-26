import React from "react";
import { AddToCart } from "../../redux/cart/cart.actions";
import { deleteFoodItem } from "../../redux/food/food.actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./FoodCard.css";

const FoodCard = ({ food, AddToCart, user, deleteFoodItem }) => {
  return (
    <div className="food-card" key={food?._id}>
      <img alt={food?.name} src={food?.image} />
      {!user?.isAdmin && (
        <button className="food-card-button" onClick={() => AddToCart(food)}>
          Add to cart
        </button>
      )}

      <div className="food-headers">
        <p className="name">{food?.name}</p>
        <p className="price"> ₹{food?.price}</p>
      </div>
      <p className="quantity">Quantity: {food?.quantity}</p>
      {user?.isAdmin && (
        <div className="admin-buttons">
          <Link className="accept" to={"/edit/" + food?._id}>
            Edit
          </Link>

          <button className="reject" onClick={() => deleteFoodItem(food?._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { AddToCart, deleteFoodItem })(
  FoodCard
);
