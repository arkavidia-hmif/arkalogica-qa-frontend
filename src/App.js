import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainQuestionPage from "./components/MainQuestion";
import QuestionPage from "./components/Question";
import DonePage from "./components/DonePage";
import AuthContextProvider from "./context/auth";
import QuestionContextProvider from "./context/questions";
import Login from "./components/Login";
import {
  FE_ARKALOGICA_PARAM,
  FE_LOGIN_PARAM,
  FE_ARKALOGICA_DONE,
} from "./constant";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <QuestionContextProvider>
          <Switch>
            <Route exact path={FE_LOGIN_PARAM} component={Login} />
            <Route
              path={FE_ARKALOGICA_PARAM}
              exact
              component={MainQuestionPage}
            />
            <Route path={FE_ARKALOGICA_DONE} exact component={DonePage} />
            <Route path={"/:questionId"} exact component={QuestionPage} />
          </Switch>
        </QuestionContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
