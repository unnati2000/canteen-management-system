import {
  ADD_FOOD_REQUEST,
  ADD_FOOD_SUCCESS,
  ADD_FOOD_FAIL,
  GET_ALL_FOOD_ITEMS_REQUEST,
  GET_ALL_FOOD_ITEMS_SUCCESS,
  GET_ALL_FOOD_ITEMS_FAIL,
  GET_SINGLE_FOOD_ITEM_REQUEST,
  GET_SINGLE_FOOD_ITEM_SUCCESS,
  GET_SINGLE_FOOD_ITEM_FAIL,
  EDIT_FOOD_ITEM_REQUEST,
  EDIT_FOOD_ITEM_SUCCESS,
  EDIT_FOOD_ITEM_FAIL,
  DELETE_FOOD_ITEM_REQUEST,
  DELETE_FOOD_ITEM_FAIL,
  DELETE_FOOD_ITEM_SUCCESS,
} from "./food.types";

const initialState = {
  foods: [],
  food: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOOD_REQUEST:
    case GET_ALL_FOOD_ITEMS_REQUEST:
    case GET_SINGLE_FOOD_ITEM_REQUEST:
    case DELETE_FOOD_ITEM_REQUEST:
    case EDIT_FOOD_ITEM_REQUEST:
      return { ...state, loading: true };
    case ADD_FOOD_SUCCESS:
      return { ...state, foods: [...state.foods, payload], loading: false };
    case GET_ALL_FOOD_ITEMS_SUCCESS:
      return { ...state, foods: payload, loading: false };
    case GET_SINGLE_FOOD_ITEM_SUCCESS:
    case EDIT_FOOD_ITEM_SUCCESS:
      return { ...state, food: payload, loading: false };
    case DELETE_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: state.foods.filter((food) => food._id !== payload),
      };
    case ADD_FOOD_FAIL:
    case GET_ALL_FOOD_ITEMS_FAIL:
    case GET_SINGLE_FOOD_ITEM_FAIL:
    case EDIT_FOOD_ITEM_FAIL:
    case DELETE_FOOD_ITEM_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
