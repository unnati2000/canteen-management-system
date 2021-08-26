import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import Homepage from "./pages/home-page/HomePage";
import SignInPage from "./pages/sign-in-page/SignInPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import Footer from "./components/footer/Footer";
import AddFoodPage from "./pages/add-food-page/AddFoodPage";
import FoodPage from "./pages/food-page/FoodPage";
import CartPage from "./pages/cart/CartPage";
import Navbar from "./components/navbar/Navbar";
import { loadUser } from "./redux/auth/auth.actions";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/private-component/PrivateComponent";
import AdminRoute from "./components/admin-component/AdminComponent";
import EditFoodPage from "./pages/edit-food-page/EditFoodPage";
import Alert from "./components/alert/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <AdminRoute exact path="/add-food" component={AddFoodPage} />
          <PrivateRoute exact path="/food" component={FoodPage} />
          <PrivateRoute exact path="/cart" component={CartPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/food/:food" component={FoodPage} />
          <AdminRoute exact path="/edit/:id" component={EditFoodPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
