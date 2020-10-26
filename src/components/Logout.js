import React from "react";

export default () => {
  const { logOut } = useAuth();

  return (
    <>
      <button onClick={logOut}>Logout</button>
    </>
  );
};
