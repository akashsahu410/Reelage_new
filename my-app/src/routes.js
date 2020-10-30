import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import config from "./component/config.js";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import ForgotPassword from "./component/forgot";
import Profile from "./component/profile";
import Changepassword from "./component/changepassword";
import Policy from "./component/policy";
import Terms_Conditions from "./component/terms_conditions";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.length > 0 ? (
        jwt.verify(localStorage.getItem("email"), config.login_secret.key, (err, decoded) => {
          if (err) {
            localStorage.clear();
            console.log("props", props);
            props.history.push("/login");
          } else {
            return decoded;
          }
        }).email !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
//to check for login and signup
const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.length > 0 ? (
        jwt.verify(localStorage.getItem("email"), config.login_secret.key, (err, decoded) => {
          if (err) {
            localStorage.clear();
            props.history.push("/login");
          } else {
            return decoded;
          }
        }).email !== null ? (
          <Redirect to="/profile" />
        ) : (
          <Component {...props} />
        )
      ) : (
        <Component {...props} />
      )
    }
  />
);
class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/privacy_policy" component={Policy} />
          <Route path="/terms_conditions" component={Terms_Conditions} />
          <Private path="/login" component={Login} />
          <Private path="/signup" component={Signup} />
          <Private path="/forgot" component={ForgotPassword} />
          <Private path="/forgetPassword" component={Changepassword} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}
export default Routes;
