import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";

export default ({ lastQuestionId }) => {
  return (
    <div className="container">
      <h1>Arkalogica</h1>
      <p className="lead">Waktumu ga banyak, jangan coba-coba!</p>

      <Link
        to={`${FE_ARKALOGICA_PARAM}${String(lastQuestionId)}`}
        className="btn btn-primary"
      >
        Balik dah ke soal tadi
      </Link>
    </div>
  );
};
