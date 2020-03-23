import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red, cyan, grey } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const App = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: red[400]
          },
          secondary: {
            main: prefersDarkMode ? grey[800] : cyan[300]
          },
          third: {
            main: "#FFF"
          },
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  function logOut() {
    userContext.setAuthToken(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="sticky">
          <Toolbar className="flex justify-between">
            <Link to="/">rEAdit</Link>
            {user ? (
              <div className="flex items-center">
                <Link to="/user">
                  <Typography className="mr-2">{user.username}</Typography>
                </Link>
                <Button color="secondary" onClick={() => logOut()}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Link to="/signin" className="mr-4">
                  Sign In
                </Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/user">
              <UserPosts />
            </Route>
            <Route path="/">
              <Posts />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
