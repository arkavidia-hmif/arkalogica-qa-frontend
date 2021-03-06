import React from "react";
import { Link } from "react-router-dom";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

const colors = [
  { color: "#e3e3e3", state: "New" },
  { color: "#62CCF2", state: "Active" },
  { color: "#57ba8c", state: "Submitted" },
  { color: "#eda84e", state: "Changed and not submitted" },
];

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
          <Link
            key={id}
            to={FE_ARKALOGICA_PARAM + question.id}
            style={{ textDecoration: "none" }}
          >
            <div
              key={question.id}
              className="answer-box py-2 px-3 my-1"
              style={{
                background: getAnswerBoxBg(question.id),
              }}
            >
              <p className="answer-number p-0 m-0">{id + 1}</p>
            </div>
          </Link>
        ))}
      </div>
      <table className="mt-2 text-left">
        <tbody>
          {colors.map(({ color, state }) => (
            <tr className="">
              <td style={{ background: color, color }}>00</td>
              <td className="pl-2"> {state}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
            transition: background-color 0.1s ease-in;
          }
          
          .answer-number {
            text-align: center;
            color: black;
          }

          .answer-box:hover {
            background-color: #62CCF2 !important;
          }


        `}
      </style>
    </div>
  );
};

export default AnswerPanel;
