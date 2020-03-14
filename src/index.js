import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"; // <- change './index.css' to './styles.css'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserTokenProvider from "./providers/UserTokenProvider";

ReactDOM.render(
  <UserTokenProvider>
    <App />
  </UserTokenProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
