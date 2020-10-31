import React, { useState } from "react";
import { createContext, useContext } from "react";
import { Redirect } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const logOut = () => {
    localStorage.removeItem("tokens");
    setAuthTokens();
  };

  return (
    <AuthContext.Provider
      value={{ authTokens, setAuthTokens: setTokens, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
