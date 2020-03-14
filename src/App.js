import React, { useState, useEffect } from "react";
import Button from "./components/button";

function App() {
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@test.com",
        password: "password2"
      })
    })
      .then(response => response.json())
      .then(bearerTokenObject => {
        setBearerToken(bearerTokenObject.token);
      });
  }, [bearerToken]);

  console.log("bearerToken: ", bearerToken);
  return (
    <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <h1>Super cool page</h1>
      <textarea value={bearerToken}></textarea>
      <Button onClick={() => console.log("I was clicked")}>
        I am a button
      </Button>
    </div>
  );
}

export default App;
