import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/auth/auth.actions";
import { Link, Redirect } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";

import "./SignInPage.css";

const SignInPage = ({ isAuthenticated, loginUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="signin-root">
      <div className="signin-div">
        <div className="signin-form">
          <AiFillLock className="signin-icon" />

          <h1>Signin to continue</h1>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(SignInPage);
