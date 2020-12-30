import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

const AnswerPanel = () => {
  const { answers, session } = useQuestion();
  const questions = session.questions;

  const getAnswerBoxBg = (id) => {
    const ans = answers[`${id}`];
    if (ans?.tag && ans?.submitted) {
      return "#57ba8c";
    } else if (ans?.tag && !ans?.submitted) {
      return "#eda84e";
    } else {
      return "#e3e3e3";
    }
  };

  return (
    <div id="main-answer">
      <h3>Answer Panel</h3>
      <div className="row justify-content start answer-panel-container">
        {questions.map((question, id) => (
          <Link key={id} to={FE_ARKALOGICA_PARAM + question.id}>
            <div
              key={question.id}
              className="col-1 answer-box"
              style={{
                background: getAnswerBoxBg(question.id),
              }}
            >
              <p
                className="answer-number"
                style={{
                  // color: answers[`${question.id}`] ? "white" : "black",
                  color: "black",
                }}
              >
                {questions.indexOf(question) + 1}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <style>
        {`
          #main-answer {
            text-align: center;
            margin-top: 2em;
          }

          .answer-panel-container {
            background: #fca7be;
            margin: 0;
            padding: 1em 0.5em;
            border-radius: 1em;
          }

          .answer-box {
            max-height: 2.25em;
            max-width: 2.25em;
            border-radius: 0.3em;
            margin: 0.4em 0.3em;
          }

          .answer-number {
            padding: 0.5em 0 0.5em 0;
            text-align: center;
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export default AnswerPanel;
