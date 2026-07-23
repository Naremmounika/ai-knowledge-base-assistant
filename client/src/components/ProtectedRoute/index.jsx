import  { Component } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

class ProtectedRoute extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return this.props.children;
  }
}

export default ProtectedRoute;