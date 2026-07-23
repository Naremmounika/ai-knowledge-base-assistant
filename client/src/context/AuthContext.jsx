import  { Component, createContext } from "react";

export const AuthContext = createContext();

class AuthProvider extends Component {
  state = {
    token: localStorage.getItem("token") || "",
    isAuthenticated: !!localStorage.getItem("token"),
  };

  login = (token) => {
    localStorage.setItem("token", token);

    this.setState({
      token,
      isAuthenticated: true,
    });
  };

  logout = () => {
    localStorage.removeItem("token");

    this.setState({
      token: "",
      isAuthenticated: false,
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          isAuthenticated: this.state.isAuthenticated,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;