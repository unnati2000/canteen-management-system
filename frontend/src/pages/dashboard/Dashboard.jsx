import React, { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { connect } from "react-redux";
import { getAdminORders } from "../../redux/order/order.actions";
import AdminDashboard from "../../components/admin-dashboard/AdminDashboard";
import UserDashboard from "../../components/user-dashboard/UserDashboard";
import "./Dashboard.css";

const Dashboard = ({ getAdminORders, user, loading }) => {
  useEffect(() => {
    getAdminORders();
  }, [getAdminORders]);

  return (
    <div>
      {loading && <Loader />}
      <div className="dashboard-root">
        <div className="profile-details">
          <div className="profile">
            <img
              alt="food_img"
              src="https://jrlifesciences.com/wp-content/uploads/2018/09/gravatar.jpg"
            />
            <h1>{user?.name}</h1>

            <p>
              <b>Branch: </b> {user?.branch}
            </p>
            <p>
              <b>Role: </b>
              {user?.role}
            </p>
          </div>
        </div>
        <div>
          <h1 className="dashboard-text">Dashboard</h1>
          {user?.isAdmin ? <AdminDashboard /> : <UserDashboard />}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  orders: state.order.orders,
  loading: state.order.loading,
});

export default connect(mapStateToProps, { getAdminORders })(Dashboard);
