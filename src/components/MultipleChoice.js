import React, { useState } from "react";
import { submitAnswers } from "../api/answers";
import { useAuth } from "../context/auth";
import { useQuestion } from "../context/questions";

export default ({ choices, questionId }) => {
  const { authTokens } = useAuth();
  const { answers, setAnswers } = useQuestion();
  const answer = answers[questionId]?.tag;
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await submitAnswers(questionId, answer, authTokens);

      if (res.answers) {
        setAnswers((answers) => {
          return {
            ...answers,
            ...JSON.parse(
              `{${JSON.stringify(questionId)}: {
                ${JSON.stringify("tag")}: ${JSON.stringify(answer)},
                ${JSON.stringify("submitted")}: ${true}
              }
              }`
            ),
          };
        });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChange = (e) =>
    setAnswers((answers) => {
      return {
        ...answers,
        ...JSON.parse(
          `{${JSON.stringify(questionId)}: {
            ${JSON.stringify("tag")}: ${JSON.stringify(e.target.value)},
            ${JSON.stringify("submitted")}: ${false} 
          }
          }`
        ),
      };
    });

  return (
    <div>
      {/* {console.log(authTokens)} */}
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
              {choice.choiceImages?.map((imageUrl) => (
                <div key={imageUrl}>
                  <img src={imageUrl} alt={choice.tag} />
                </div>
              ))}
              <div>{choice.content}</div>
            </label>
          </div>
        ))}
        <div className="text-center">
          <button className="btn btn-lg arkav-btn text-center" type="submit">
            Submit
          </button>
          {error && <h4>{error}</h4>}
        </div>
      </form>
    </div>
  );
};
