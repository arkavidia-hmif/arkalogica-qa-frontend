import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const postLogin = (event) => {
    event.preventDefault();
    const instance = axios.create({
      baseURL: "https://staging.api.arkavidia.id/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance
      .post("/auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          console.log(res.data);
          setAuthTokens(res.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  if (loggedIn) {
    return <Redirect to="/arkalogica" />;
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={postLogin}>
          <div>
            <label>Email </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">SUBMIT</button>
          {/* <button onClick={postLogin}>Sign In</button> */}
        </form>
        {isError && <p>The username or password provided were incorrect!</p>}
      </div>
    </div>
  );
};

export default Login;
