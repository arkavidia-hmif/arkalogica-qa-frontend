import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
// import { textQuestion } from "../constant";
import { useQuestion } from "../context/questions";

const AnswerPanel = () => {
  //   const questionId = textQuestion.question.map((question) => question.id);
  // const size = 20;
  // const questionId = [...Array(size).keys()].map((i) => i + 1);
  // const answers = {
  //   1: "b",
  //   3: "c",
  //   5: "c",
  //   6: "c",
  //   7: "c",
  //   10: "c",
  //   12: "c",
  //   13: "c",
  //   16: "c",
  //   17: "c",
  //   18: "c",
  //   19: "c",
  // };

  const { answers, session } = useQuestion();
  const questions = session.question;

  const getAnswerBoxBg = (id) => {
    const ans = answers[`${id}`];
    if (ans?.tag && ans?.submitted) {
      return "#79fc82";
    } else if (ans?.tag && !ans?.submitted) {
      return "#f5c440";
    } else {
      return "#e3e3e3";
    }
  };

  return (
    <div>
      <h3>Answer Panel</h3>
      <div className="row justify-content start answer-panel-container">
        {questions.map((question) => {
          return (
            <div
              key={question.id}
              className="col-2 answer-box"
              style={{
                background: getAnswerBoxBg(question.id),
              }}
            >
              <Link to={`${FE_ARKALOGICA_PARAM}/${question.id}`}>
                <p className="answer-number">
                  {questions.indexOf(question) + 1}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .answer-panel-container {
            background: #a8a8a8;
            margin: 0;
            padding: 1em 0.5em;
            border-radius: 1em;
          }

          .answer-box {
            height: 4em;
            border-radius: 0.3em;
            margin: 0.4em 0.3em;
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
