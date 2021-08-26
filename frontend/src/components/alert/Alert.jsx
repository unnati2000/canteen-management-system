import React from "react";
import { connect } from "react-redux";
import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`notification ${alert.alertType}`}>
      {alert.msg}
      {console.log(alert)}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
