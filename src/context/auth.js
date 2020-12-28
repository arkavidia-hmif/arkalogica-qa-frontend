import React, { useState } from "react";
import { createContext, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FE_LOGIN_PARAM } from "../constant";
// import { Redirect } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("is_validated"))
  );
  const [authData, setAuthData] = useState({});

  const setData = (data) => {
    setAuthData(data);
    localStorage.setItem("tokens", JSON.stringify(data.token));
    setAuthTokens(data.token);
    localStorage.setItem("is_validated", JSON.stringify(true));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setAuthData({});
    localStorage.removeItem("tokens");
    localStorage.removeItem("is_validated");
    setIsLoggedIn(false);
    setAuthTokens("");
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        authData,
        setData,
        logOut,
        isLoggedIn,
      }}
    >
      {!isLoggedIn && <Redirect to={FE_LOGIN_PARAM} />}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
