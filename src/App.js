import React, { useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { UserTokenContext } from "./providers/UserTokenProvider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red, cyan, grey } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const App = () => {
  const userTokenContext = useContext(UserTokenContext);
  const bearerToken = userTokenContext.userToken;

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

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "elden@test.com",
          password: "password"
        })
      });
      const bearerTokenObject = await response.json();
      userTokenContext.setAuthToken(bearerTokenObject.token);
    };
    const fetchItems = async token => {
      const itemsResponse = await fetch("http://localhost:3000/api/item", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const itemsJson = await itemsResponse.json();
      console.log(itemsJson);
    };
    if (!bearerToken) {
      fetchToken();
    } else {
      fetchItems(bearerToken);
    }
  }, [userTokenContext, bearerToken]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
