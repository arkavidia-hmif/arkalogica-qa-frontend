import React, { useEffect, useState } from "react";
import { getAllAnswers } from "../api/answers";
import { useQuestion } from "../context/questions";
// import { FE_ARKALOGICA_PARAM } from "../constant";
// import { Link } from "react-router-dom";

export default () => {
  const { answers, session, isSessionStarted } = useQuestion();
  const questions = session.question;

  return isSessionStarted ? (
    <div className="container">
      <h1>Your Answer</h1>
      {questions.map((question) => {
        return (
          <p>
            Question {questions.indexOf(question) + 1} :{" "}
            {answers[`${question.id}`] || "Not yet answered"}
          </p>
        );
      })}
    </div>
  ) : (
    <div>Times up</div>
  );
};
