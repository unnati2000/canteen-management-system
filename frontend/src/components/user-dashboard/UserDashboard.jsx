import React, { useEffect } from "react";
import { connect } from "react-redux";
import DashboardCard from "../../components/order-card/OrderCard";
import { getMyOrders } from "../../redux/order/order.actions";
import "./UserDashboard.css";

const UserDashboard = ({ getMyOrders, orders }) => {
  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  console.log(orders);

  return (
    <div>
      <div className="order-status">
        {orders?.map((order) => (
          <DashboardCard order={order} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

export default connect(mapStateToProps, { getMyOrders })(UserDashboard);
