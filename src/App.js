import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./components/Arkalogica";
import QuestionPage from "./components/Question";
import AuthContextProvider from "./context/auth";
import QuestionContextProvider from "./context/questions";
import { FE_ARKALOGICA_PARAM } from "./constant";
// import Login from "./components/Login";
// import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <QuestionContextProvider>
        <Router>
          {/* <Route exact path="/" component={Login} /> */}
          <Route exact path={FE_ARKALOGICA_PARAM} component={MainPage} />
          <Route
            path={FE_ARKALOGICA_PARAM + "/:questionNumber"}
            component={QuestionPage}
          />
        </Router>
      </QuestionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
