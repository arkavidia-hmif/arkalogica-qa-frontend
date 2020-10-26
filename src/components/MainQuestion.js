import React from "react";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";
import { Link } from "react-router-dom";

export default () => {
  const { isSessionStarted, session } = useQuestion();

  const time = String(new Date(session?.endTime));
  return isSessionStarted ? (
    <div className="container">
      <h1>{session?.title}</h1>
      <p className="font-weight-bold">End time: {time}</p>
      <p>{session?.description}</p>
      <Link
        to={FE_ARKALOGICA_PARAM + "/" + String(session?.question[0]?.id)}
        className="btn btn-primary"
      >
        Challenge
      </Link>
    </div>
  ) : (
    <>
      <h1>Arkalogica Preliminary</h1>
      Waiting
    </>
  );
};
