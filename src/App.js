import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Arkalogica from "./components/Arkalogica";
import Login from "./components/Login";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/arkalogica" component={Arkalogica} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
