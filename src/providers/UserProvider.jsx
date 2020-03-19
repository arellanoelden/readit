import React, { Component, createContext } from "react";

export const UserContext = createContext();

class UserProvider extends Component {
  state = {
    userToken: null,
    user: null
  };
  setAuthToken = this.setAuthToken.bind(this);

  async setAuthToken(userToken) {
    if (userToken === null) {
      this.setState({
        userToken,
        user: null
      });
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
        console.log(user);
      };
      if (userToken) {
        fetchUser();
      }
    }
  }

  render() {
    const { userToken, user } = this.state;
    const { children } = this.props;
    const value = { userToken, user, setAuthToken: this.setAuthToken };
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }
}

export default UserProvider;
