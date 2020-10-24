import React from "react";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { Link } from "react-router-dom";

export default ({ number, totalQuestion }) => {
  return (
    <>
      {number !== 1 && (
        <Link
          to={`${FE_ARKALOGICA_PARAM}/${String(number - 1)}`}
          className="btn btn-primary"
        >
          Previous
        </Link>
      )}
      {number !== totalQuestion && (
        <Link
          to={`${FE_ARKALOGICA_PARAM}/${String(number + 1)}`}
          className="btn btn-primary"
        >
          Next
        </Link>
      )}
    </>
  );
};
