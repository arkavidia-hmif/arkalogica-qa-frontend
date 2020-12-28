import React from "react";
import { useAuth } from "../context/auth";

export default () => {
  const { logOut } = useAuth();

  return (
    <>
      <button className="btn ml-2 mb-3 arkav-btn " onClick={logOut}>
        Logout
      </button>
    </>
  );
};
