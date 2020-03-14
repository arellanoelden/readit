import React, { Component, createContext } from "react";

export const UserTokenContext = createContext();

class UserTokenProvider extends Component {
  state = {
    userToken: null
  };
  setAuthToken = this.setAuthToken.bind(this);

  setAuthToken(userToken) {
    this.setState({ userToken });
  }

  render() {
    const { userToken } = this.state;
    const { children } = this.props;
    const value = { userToken, setAuthToken: this.setAuthToken };
    return (
      <UserTokenContext.Provider value={value}>
        {children}
      </UserTokenContext.Provider>
    );
  }
}

export default UserTokenProvider;
