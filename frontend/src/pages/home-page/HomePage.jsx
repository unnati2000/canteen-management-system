import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import cofee from "../../assets/cofee.png";
import samosa from "../../assets/samosa.png";
import dosa from "../../assets/dosa.png";
import noodles from "../../assets/noodles.png";
import { getAllFoodItems } from "../../redux/food/food.actions";
const Homepage = () => {
  return (
    <div>
      <div className="landing-page-div">
        <div className="landing-page-header"> </div>
      </div>
      <div className="menu">
        <div className="menu-header">
          <h3>What we're offering</h3>
        </div>
        <div className="menu-card-div">
          <div className="menu-card">
            <div className="red">
              <h1>Breakfast</h1>
            </div>
            <img src={cofee} className="image" alt="tea" />
            <div>
              <Link
                to="/food/breakfast"
                onClick={() => getAllFoodItems("breakfast")}
              >
                <button className="button">See More</button>
              </Link>
            </div>
          </div>
          <div className="menu-card">
            <div className="red">
              <h1>Indian</h1>
            </div>
            <img src={dosa} className="dosa" alt="dosa" />
            <div>
              <Link to="/food/indian" onClick={() => getAllFoodItems("indian")}>
                <button className="button">See More</button>
              </Link>
            </div>
          </div>
          <div className="menu-card">
            <div className="red">
              <h1>Chinese</h1>
            </div>
            <img src={noodles} className="chinese" alt="noodles" />
            <div>
              <Link
                to="/food/chinese"
                onClick={() => getAllFoodItems("chinese")}
              >
                <button className="button">See More</button>
              </Link>
            </div>
          </div>
          <div className="menu-card breakfast">
            <div className="red">
              <h1>Chat</h1>
            </div>
            <img src={samosa} className="samosa" alt="samosa" />
            <div>
              <Link to="/food/chat" onClick={() => getAllFoodItems("chat")}>
                <button className="button">See More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Homepage;
