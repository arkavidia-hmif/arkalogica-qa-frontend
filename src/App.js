import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Arkalogica from "./components/Arkalogica";
import Login from "./components/Login";
import AuthContextProvider from "./context/auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/arkalogica" component={Arkalogica} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
