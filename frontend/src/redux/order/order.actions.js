import axios from "axios";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_ADMIN_ORDER_REQUEST,
  GET_ADMIN_ORDER_SUCCESS,
  GET_ADMIN_ORDER_FAIL,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  SET_PAYMENT_TYPE_SUCCESS,
  SET_PAYMENT_TYPE_REQUEST,
  SET_PAYMENT_TYPE_FAIL,
  SET_PAYMENT_STATUS_SUCCESS,
  SET_PAYMENT_STATUS_REQUEST,
  SET_PAYMENT_STATUS_FAIL,
} from "./order.types";
import { setAlert } from "../alert/alert.actions";

export const placeOrder = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/place/order",
      formData
    );

    dispatch({ type: PLACE_ORDER_SUCCESS, data: data });
    dispatch(setAlert("Placed order successfully", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, "danger"));
    }

    dispatch({ type: PLACE_ORDER_FAIL, payload: error.message });
  }
};

export const getAdminORders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_ORDER_REQUEST });

    const { data } = await axios.get("http://localhost:5000/orders");
    console.log(data);
    dispatch({ type: GET_ADMIN_ORDER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_ADMIN_ORDER_FAIL, payload: error });
    console.log(error);
  }
};

export const confirmOrder = (id, isConfirmed, history) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_ORDER_REQUEST });

    const { data } = await axios.put(`http://localhost:5000/orders/${id}`, {
      isConfirmed,
    });
    dispatch({
      type: CONFIRM_ORDER_SUCCESS,
      payload: { data, id, isConfirmed },
    });
    window.location.reload();
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response && error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    if (error.response && error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, "danger"));
    }

    dispatch({ type: CONFIRM_ORDER_FAIL, payload: error });
    console.log(error);
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/myorders`);
    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MY_ORDERS_FAIL, payload: error });
    console.log(error);
  }
};

export const setpaymentType = (id, paymentType, history) => async (
  dispatch
) => {
  try {
    dispatch({ type: SET_PAYMENT_TYPE_REQUEST });

    const { data } = await axios.put(
      `http://localhost:5000/order/payment-type/${id}`,
      {
        paymentType,
      }
    );
    dispatch({
      type: SET_PAYMENT_TYPE_SUCCESS,
      payload: { data, id, paymentType },
    });
    window.location.reload();
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: SET_PAYMENT_TYPE_FAIL, payload: error });
    console.log(error);
  }
};

export const setpaymentStatus = (id, history) => async (dispatch) => {
  try {
    dispatch({ type: SET_PAYMENT_STATUS_REQUEST });

    const { data } = await axios.put(
      `http://localhost:5000/payment-status/${id}`
    );
    dispatch({ type: SET_PAYMENT_STATUS_SUCCESS, payload: { data, id } });
    dispatch(setAlert("Payment done", "success"));
    window.location.reload();
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: SET_PAYMENT_STATUS_FAIL, payload: error });
    console.log(error);
  }
};
