import React from "react";
import { textQuestion } from "../constant";
import { useQuestion } from "../context/questions";

const AnswerPanel = () => {
  //   const questionId = textQuestion.question.map((question) => question.id);
  const size = 20;
  const questionId = [...Array(size).keys()].map((i) => i + 1);
  // const { answers } = useQuestion();
  const answers = {
    1: "b",
    3: "c",
    5: "c",
    6: "c",
    7: "c",
    10: "c",
    12: "c",
    13: "c",
    16: "c",
    17: "c",
    18: "c",
    19: "c",
  };

  const answerPanelContainer = {
    background: "#a8a8a8",
    display: "grid",
    width: "33%",
    margin: "1em",
    padding: "1em",
    "grid-template-columns": "repeat(auto-fit, minmax(3em, 1fr))",
    "border-radius": "1em",
    "grid-gap": "1em",
  };

  const answerBox = {
    padding: "0",
    "border-radius": ".3em",
    height: "3em",
    "font-size": "1.5em",
    "text-align": "center",
  };

  return (
    <div>
      <h1>Answer Panel</h1>
      <div style={answerPanelContainer}>
        {questionId.map((id) => {
          return (
            <p
              style={{
                ...answerBox,
                background: answers[`${id}`] ? "#79fc82" : "#e3e3e3",
              }}
            >
              {id}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerPanel;
