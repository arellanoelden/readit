import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"; // <- change './index.css' to './styles.css'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
