import React from "react";
import {
  FE_ARKALOGICA_PARAM,
  FE_ARKALOGICA_SUBMISSION_PARAM,
} from "../constant";
import { Link } from "react-router-dom";

export default ({ previousQuestionId, nextQuestionId }) => {
  return (
    <div className="row mb-3">
      <div className="col-10">
      {previousQuestionId && (
        <Link
          to={`${FE_ARKALOGICA_PARAM}/${previousQuestionId}`}
          className="btn btn-outline-primary"
        >
          Previous
        </Link>
      )}
      </div>
      <div className="col-2">
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
          Confirm
        </Link>
      )}
      </div>
    </div>
  );
};
