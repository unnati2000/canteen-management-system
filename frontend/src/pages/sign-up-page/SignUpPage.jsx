import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/auth/auth.actions";
import { Redirect } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { setAlert } from "../../redux/alert/alert.actions";
import { Link } from "react-router-dom";

import "./SignUpPage.css";

const SignUpPage = ({ registerUser, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    role: "",
  });

  const { name, email, password, confirmPassword, branch, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setAlert("Password do not match", "danger");
    } else {
      registerUser(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="root">
      <div className="signup-div">
        <div className="signup-form">
          <MdAccountCircle className="sign-up-icon" />
          <h1>Create an account</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
            />
            <br></br>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onChange}
            />
            <br />
            <select name="branch" value={branch} onChange={onChange} id="cars">
              <option value="null">Branch </option>
              <option value="COMPUTER">CMPN</option>
              <option value="IT">IT</option>
              <option value="EXTC">EXTC</option>
              <option value="ETRX">ETRX</option>
              <option value="MECHANICAL">MECHANICAL</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <br />

            <div className="role-div">
              <input
                type="radio"
                id="teacher"
                value="teacher"
                onChange={() => setFormData({ ...formData, role: "teacher" })}
                name="role"
              />
              <label for="teacher">Teacher</label>

              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                onChange={() => setFormData({ ...formData, role: "student" })}
              />
              <label for="student">Student</label>
            </div>

            <br />

            <button type="submit">Submit</button>
          </form>
          <p>
            Already have an account? <Link to="/signin">SignIn</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser, setAlert })(SignUpPage);
