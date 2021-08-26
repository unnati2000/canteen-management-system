import {
  SIGNUP_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  LOGOUT,
} from "./auth.types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case SIGNIN_REQUEST:
    case SIGNUP_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case SIGNIN_FAIL:
    case SIGNUP_FAIL:
      return { ...state, loading: false };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
