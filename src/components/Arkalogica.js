import React from "react";
import { useAuth } from "../context/auth";

const Arkalogica = () => {
  const { setAuthTokens } = useAuth();

  //PERLU DIGANTI LAGI
  const logout = () => {
    setAuthTokens("");
  };
  return (
    <div>
      <h1>Arkalogica</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Arkalogica;
