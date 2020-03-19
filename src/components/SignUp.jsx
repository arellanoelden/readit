import React, { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    });
    const bearerTokenObject = await response.json();

    if (bearerTokenObject.token) {
      userContext.setAuthToken(bearerTokenObject.token);
      history.push("/");
    }
  }

  return (
    <Paper elevation={3} className="w-full flex flex-col items-center">
      <Typography variant="h2" component="h1" className="py-4">
        Sign Up
      </Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={e => createUser(e)}
        className="p-8 flex flex-col w-full"
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="my-4"
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="my-4"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="my-4"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="my-4"
        >
          SIGN UP
        </Button>
      </form>
    </Paper>
  );
};

export default SignUp;
