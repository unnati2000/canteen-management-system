import React from "react";
import loader from "../../assets/loader.gif";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-div">
      <img src={loader} className="loader" alt="loader" />
    </div>
  );
};

export default Loader;
