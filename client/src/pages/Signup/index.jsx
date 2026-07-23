import { Component } from "react";
import { Navigate, Link } from "react-router-dom";

import api from "../../services/api";

import "./index.css";

class Signup extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    redirect: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      error: "",
    });

    try {

      await api.post("/auth/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      this.setState({
        redirect: true,
      });

    } catch (error) {

      this.setState({
        error:
          error.response?.data?.message ||
          "Signup Failed",
      });

    } finally {

      this.setState({
        loading: false,
      });

    }
  };

  render() {

    if (this.state.redirect) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="login-container">

        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >

          <h1>Create Account</h1>

          {this.state.error && (
            <p className="error">
              {this.state.error}
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button
            type="submit"
            disabled={this.state.loading}
          >
            {this.state.loading
              ? "Creating..."
              : "Sign Up"}
          </button>

          <p>

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>
    );
  }
}

export default Signup;