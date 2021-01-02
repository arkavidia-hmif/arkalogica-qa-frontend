import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

const AnswerPanel = ({ selected }) => {
  const { answers, session } = useQuestion();
  const questions = session.questions;

  const getAnswerBoxBg = (id) => {
    const ans = answers[`${id}`];

    if (selected && selected === id) {
      return "#62CCF2";
    }

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
      <div className="row justify-content-between answer-panel-container m-0">
        {questions.map((question, id) => (
          <Link key={id} to={FE_ARKALOGICA_PARAM + question.id}>
            <div
              key={question.id}
              className="answer-box py-2 px-3 my-1"
              style={{
                background: getAnswerBoxBg(question.id),
              }}
            >
              <p
                className="answer-number p-0 m-0"
                style={{
                  // color: answers[`${question.id}`] ? "white" : "black",
                  color: "black",
                }}
              >
                {id + 1}
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
            padding: 1em 0.5em;
            border-radius: 1em;
          }

          .answer-box {
            border-radius: 0.3em;
          }

          .answer-number {
            text-align: center;
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export default AnswerPanel;
