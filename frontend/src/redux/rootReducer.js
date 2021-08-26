import { combineReducers } from "redux";
import alert from "./alert/alert.reducers";
import auth from "./auth/auth.reducers";
import food from "./food/food.reducers";
import cart from "./cart/cart.reducers";
import order from "./order/order.reducers";
export default combineReducers({ auth, food, alert, cart, order });
