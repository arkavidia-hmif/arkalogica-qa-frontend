import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

export default ({ lastQuestionId }) => {
  const { isSessionStarted } = useQuestion();

  return (
    <div className="container">
      <h1>Arkalogica</h1>
      <p className="lead">NO TRY TRY!</p>
      {isSessionStarted && (
        <Link
          to={`${FE_ARKALOGICA_PARAM}${String(lastQuestionId)}`}
          className="btn arkav-btn"
        >
          Back to previous question
        </Link>
      )}
    </div>
  );
};
