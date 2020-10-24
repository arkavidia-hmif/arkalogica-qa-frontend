import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import MainQuestionPage from "./components/MainQuestion";
import QuestionPage from "./components/Question";
import AuthContextProvider from "./context/auth";
import QuestionContextProvider from "./context/questions";
// import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import {
  FE_ARKALOGICA_PARAM,
  FE_LOGIN_PARAM,
  FE_HOMEPAGE_PARAM,
} from "./constant";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <QuestionContextProvider>
          <Switch>
            <Route exact path={FE_HOMEPAGE_PARAM} component={Home} />
            <Route exact path={FE_LOGIN_PARAM} component={Login} />
            <Route
              exact
              path={FE_ARKALOGICA_PARAM}
              component={MainQuestionPage}
            />
            <Route
              path={FE_ARKALOGICA_PARAM + "/:questionNumber"}
              component={QuestionPage}
            />
          </Switch>
        </QuestionContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
