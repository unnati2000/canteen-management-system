import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="about">
        <h2>About Policy</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </p>
      </div>
      <div className="header">
        <h2>Header</h2>
        <p>Link</p>
        <p>Link</p>
        <p>Link</p>
        <p>Link</p>
      </div>
      <div className="header">
        <h2>Header</h2>
        <p>Link</p>
        <p>Link</p>
        <p>Link</p>
        <p>Link</p>
      </div>
      <div className="contact-us">
        <h2>Contact Us</h2>
        <p>
          <b>Address:</b> Z-302, Some Random Street, Some Random City, Some
          Random Country, 0000000{" "}
        </p>
        <p>
          <b>Phone No:</b> 101010101
        </p>
      </div>
    </div>
  );
};

export default Footer;
