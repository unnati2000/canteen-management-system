import axios from "axios";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from "./auth.types";
import { setAlert } from "../../redux/alert/alert.actions";
import setAuthToken from "../../utils/setAuthToken";

// Load user from token
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Dispatch REGISTER_REQUEST
    dispatch({
      type: SIGNUP_REQUEST,
    });

    // Make a request to backend API
    const res = await axios.post(
      "http://localhost:5000/signup",
      formData,
      config
    );

    // If no errors, dispatch REGISTER_SUCCESS
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Created account successfully", "success"));

    dispatch(loadUser());
  } catch (err) {
    // Send alerts
    const errors = err.response.data.errors;
    console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }

    // Dispatch REGISTER_FAIL if error
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Dispatch LOGIN_REQUEST
    dispatch({
      type: SIGNIN_REQUEST,
    });

    // Make a request to backend API
    const res = await axios.post(
      "http://localhost:5000/signin",
      formData,
      config
    );

    // If no errors, dispatch LOGIN_SUCCESS
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert("Signed In  successfully", "success"));
  } catch (err) {
    // Send alerts
    const errors = err.response && err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }

    // Dispatch LOGIN_FAIL if error
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
