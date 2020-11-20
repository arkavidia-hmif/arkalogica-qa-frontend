import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { FE_HOMEPAGE_PARAM } from "../constant";
import { useFormInput } from "../hooks";
import Countdown from "./Countdown";
import AnswerPanel from "./AnswerPanel";

const Login = () => {
  const [values, handleChange] = useFormInput({ email: "", password: "" });
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const postLogin = (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: "https://staging.api.arkavidia.id/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance
      .post("/auth/login/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.token) {
          setAuthTokens(res.data.token);
          setIsLoggedIn();
        } else {
          setIsError();
        }
      })
      .catch(() => {
        setIsError();
      });
  };

  if (loggedIn) {
    return <Redirect to={FE_HOMEPAGE_PARAM} />;
  }

  return (
    <div>
      <div className="container">
        <h2>Arkalogica Login</h2>
        <div className="row">
          <form onSubmit={postLogin} className="col-lg-6">
            <div>
              <label>Email </label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn-primary mt-3 btn-lg">Login</button>
          </form>
        </div>
        {isError && <p>The username or password provided were incorrect!</p>}
      </div>
      <style jsx>{`
        h2 {
          text-align: center;
        }
        form {
          margin-top: 5rem;
        }
        label {
          font-style: normal;
          font-weight: bold;
          font-size: 1.4rem;
          line-height: 1.2rem;
          display: block;
          color: #000000;
          margin-top: 0.8rem;
        }
        input {
          width: 100%;
          border: none;
          padding: 0.5rem 0 0.5rem 0;
          border-bottom: 0.15rem solid black;
          box-sizing: border-box;
          background: none;
          margin: 0.5rem 0 1rem 0;
        }
        input:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Login;
