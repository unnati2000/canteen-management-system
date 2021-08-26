import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_ADMIN_ORDER_REQUEST,
  GET_ADMIN_ORDER_SUCCESS,
  GET_ADMIN_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_FAIL,
  SET_PAYMENT_TYPE_REQUEST,
  SET_PAYMENT_TYPE_SUCCESS,
  SET_PAYMENT_TYPE_FAIL,
  SET_PAYMENT_STATUS_REQUEST,
  SET_PAYMENT_STATUS_SUCCESS,
  SET_PAYMENT_STATUS_FAIL,
} from "./order.types";

const initialState = {
  orders: [],
  order: {},
  loading: true,
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PLACE_ORDER_REQUEST:
    case GET_ADMIN_ORDER_REQUEST:
    case GET_MY_ORDERS_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case SET_PAYMENT_TYPE_REQUEST:
    case SET_PAYMENT_STATUS_REQUEST:
      return { ...state, loading: true };
    case PLACE_ORDER_SUCCESS:
      return { ...state, orders: [...state.orders, payload], loading: false };
    case GET_ADMIN_ORDER_SUCCESS:
    case GET_MY_ORDERS_SUCCESS:
      return { ...state, orders: payload, loading: false };
    case CONFIRM_ORDER_SUCCESS:
      const indexConfirm = state.orders.findIndex((i) => i._id === payload.id);
      const newOrderConfirm = [...state.orders];
      newOrderConfirm[indexConfirm].isConfirmed = payload.isConfirmed;
      return { ...state, orders: newOrderConfirm, loading: false };
    case SET_PAYMENT_TYPE_SUCCESS:
      const indexType = state.orders.findIndex((i) => i._id === payload.id);
      const newOrderType = [...state.orders];
      newOrderType[indexType].paymentType = payload.paymentType;
      return { ...state, orders: newOrderType, loading: false };
    case SET_PAYMENT_STATUS_SUCCESS:
      const indexStatus = state.orders.findIndex((i) => i._id === payload._id);
      const newOrderStatus = [...state.orders];
      newOrderStatus[indexStatus].paymentStatus = true;
      return { ...state, orders: newOrderStatus, loading: false };
    case PLACE_ORDER_FAIL:
    case GET_ADMIN_ORDER_FAIL:
    case GET_MY_ORDERS_FAIL:
    case CONFIRM_ORDER_FAIL:
    case SET_PAYMENT_STATUS_FAIL:
    case SET_PAYMENT_TYPE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
