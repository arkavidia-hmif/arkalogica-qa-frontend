import React from "react";
import { useQuestion } from "../context/questions";
// import { FE_ARKALOGICA_PARAM } from "../constant";
// import { Link } from "react-router-dom";

export default () => {
  const { isSessionStarted } = useQuestion();

  return isSessionStarted && <div className="container">rw</div>;
};
