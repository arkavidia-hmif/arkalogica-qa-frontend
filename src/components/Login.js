import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  //PERLU DIGANTI LAGI, PAKE API LOGIN
  const postLogin = () => {
    setAuthTokens("TESTOKEN12345");
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Redirect to="/arkalogica" />;
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label>Username </label>
            <input
              type="text"
              placeholder="Masukan username anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
