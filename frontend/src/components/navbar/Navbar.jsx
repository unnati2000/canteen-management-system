import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth/auth.actions";
import "./Navbar.css";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logoutUser,
  cart,
}) => {
  const LoggedOut = (
    <div>
      <Link to="/signin" className="link btn">
        SignIn
      </Link>
      <Link to="/signup" className="link">
        SignUp
      </Link>
    </div>
  );

  const LoggedInUser = (
    <div>
      <Link to="/signin" className="link">
        Home
      </Link>
      <Link to="/cart" className="link">
        Cart{" "}
        {cart?.length > 0 && <span className="cart-no">{cart?.length}</span>}
      </Link>

      <Link to="/dashboard" className="link">
        Dashboard
      </Link>
      <button className="link btn" onClick={() => logoutUser()} href="#!">
        Logout
      </button>
    </div>
  );
  const LoggedInAdmin = (
    <div>
      <Link to="/signin" className="link">
        Home
      </Link>
      <Link to="/add-food" className="link">
        Add Item
      </Link>
      <Link to="/dashboard" className="link">
        Dashboard
      </Link>
      <Link className="link btn" onClick={() => logoutUser()}>
        Logout
      </Link>
    </div>
  );
  return (
    <div className="navbar">
      {isAuthenticated & !loading
        ? user?.isAdmin
          ? LoggedInAdmin
          : LoggedInUser
        : LoggedOut}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cartItems,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
