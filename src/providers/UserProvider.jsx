import React, { Component, createContext } from "react";

export const UserContext = createContext();

class UserProvider extends Component {
  state = {
    userToken: localStorage.getItem("bearerToken"),
    user: null
  };
  setAuthToken = this.setAuthToken.bind(this);
  getUser = this.getUser.bind(this);

  componentDidMount() {
    // localstorage had token
    if (this.state.userToken) {
      console.log("set user");
      this.setAuthToken(this.state.userToken);
    }
  }
  async setAuthToken(userToken) {
    if (userToken === null) {
      this.setState({
        userToken,
        user: null
      });
      localStorage.clear();
    } else {
      const fetchUser = async () => {
        const response = await fetch("http://localhost:3000/api/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
          }
        });
        const user = await response.json();
        this.setState({
          userToken,
          user: user.data
        });
        localStorage.setItem("bearerToken", userToken);
        localStorage.setItem("user", JSON.stringify(user.data));
      };
      if (userToken) {
        fetchUser();
      }
    }
  }

  async getUser() {
    const { userToken } = this.state;
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        }
      });
      const user = await response.json();
      this.setState({
        user: user.data
      });
      localStorage.setItem("bearerToken", userToken);
      localStorage.setItem("user", JSON.stringify(user.data));
    };
    if (userToken) {
      fetchUser();
    }
  }

  render() {
    const { userToken, user } = this.state;
    const { children } = this.props;
    const value = {
      userToken,
      user,
      setAuthToken: this.setAuthToken,
      getUser: this.getUser
    };
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }
}

export default UserProvider;
