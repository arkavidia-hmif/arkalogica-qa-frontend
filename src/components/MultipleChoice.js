import React from "react";
import { submitAnswers } from "../api/answers";
import { useQuestion } from "../context/questions";

export default ({ choices, questionId }) => {
  const { answers, setAnswers } = useQuestion();
  const answer = answers[questionId];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = submitAnswers(questionId, answer);
    data.answer.map(({ question, tag }) => {
      setAnswers((answers) => {
        return {
          ...answers,
          ...JSON.parse(
            `{${JSON.stringify(question)}: ${JSON.stringify(tag)}}`
          ),
        };
      });
    });
  };

  const handleChange = (e) =>
    setAnswers((answers) => {
      return {
        ...answers,
        ...JSON.parse(
          `{${JSON.stringify(questionId)}: ${JSON.stringify(e.target.value)}}`
        ),
      };
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {choices?.map((choice) => (
          <div className="radio" key={choice.tag}>
            <label>
              <input
                type="radio"
                value={choice.tag}
                checked={String(answer) === String(choice.tag)}
                onChange={handleChange}
              />{" "}
              <span
                className={
                  String(answer) === String(choice.tag)
                    ? "font-weight-bold lead"
                    : "lead"
                }
              >
                {choice.tag}.
              </span>
              {choice.images?.map((image) => (
                <div key={image.url}>
                  <img src={image.url} alt={choice.tag} />
                </div>
              ))}
              <div>{choice.content}</div>
            </label>
          </div>
        ))}
        <div className="text-center">
          <button className="btn btn-lg btn-primary text-center" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
