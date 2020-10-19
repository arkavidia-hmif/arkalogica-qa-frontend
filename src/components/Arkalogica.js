import React from "react";
import { useAuth } from "../context/auth";

const Arkalogica = () => {
  const { logOut } = useAuth();

  return (
    <div>
      <h1>Arkalogica</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Arkalogica;
