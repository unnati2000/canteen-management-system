import React, { useEffect } from "react";
import FoodCard from "../../components/food-card/FoodCard";
import { connect } from "react-redux";
import Loader from "../../components/loader/Loader";
import { getAllFoodItems } from "../../redux/food/food.actions";
import "./FoodPage.css";

const FoodPage = ({ foods, loading, match, getAllFoodItems }) => {
  console.log(match.params.food);
  useEffect(() => {
    getAllFoodItems(match.params.food);
  }, [getAllFoodItems, match]);

  return (
    <div className="food-root">
      <h1>Category Name</h1>
      {loading && <Loader />}
      <div className="food-page">
        {foods?.map((food) => (
          <FoodCard food={food} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  foods: state.food.foods,
  loading: state.food.loading,
});

export default connect(mapStateToProps, { getAllFoodItems })(FoodPage);
