import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

export default () => {
  const { isSessionStarted, session } = useQuestion();

  return isSessionStarted ? (
    <div className="container">
      <h2 className="text-center">You have reached the end of question</h2>

      <div className="row mt-5">
        <div className="col-10">
          <Link
            to={
              FE_ARKALOGICA_PARAM +
              String(session?.questions[session.questions.length - 1]?.id)
            }
            className="btn btn-outline-primary"
          >
            Previous
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>Times up</div>
  );
};
