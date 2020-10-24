import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { FE_HOMEPAGE_PARAM } from "../constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const postLogin = () => {
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
    return <Redirect to={FE_HOMEPAGE_PARAM} />;
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form>
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
          <button onClick={postLogin}>Sign In</button>
        </form>
        {isError && <p>The username or password provided were incorrect!</p>}
      </div>
    </div>
  );
};

export default Login;
