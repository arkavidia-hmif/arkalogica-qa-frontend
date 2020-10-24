import React from "react";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";
import { Link } from "react-router-dom";

export default () => {
  const { session } = useQuestion();
  const time = String(new Date(session?.endTime));
  return (
    <div className="container">
      <h1>{session?.title}</h1>
      <p className="font-weight-bold">End time: {time}</p>
      <p>{session?.description}</p>
      <Link to={FE_ARKALOGICA_PARAM + "/1"} className="btn btn-primary">
        Challenge
      </Link>
    </div>
  );
};
