import React from "react";
import {
  FE_ARKALOGICA_PARAM,
  FE_ARKALOGICA_SUBMISSION_PARAM,
} from "../constant";
import { Link } from "react-router-dom";

export default ({ previousQuestionId, nextQuestionId }) => {
  return (
    <div className="justify-content-between d-flex mb-3">
      {previousQuestionId && (
        <Link
          to={`${FE_ARKALOGICA_PARAM}/${previousQuestionId}`}
          className="btn btn-outline-primary"
        >
          Previous
        </Link>
      )}

      {nextQuestionId ? (
        <Link
          to={`${FE_ARKALOGICA_PARAM}/${nextQuestionId}`}
          className="btn btn-primary"
        >
          Next
        </Link>
      ) : (
        <Link
          to={`${FE_ARKALOGICA_SUBMISSION_PARAM}`}
          className="btn btn-primary"
        >
          Confirm submission
        </Link>
      )}
    </div>
  );
};
