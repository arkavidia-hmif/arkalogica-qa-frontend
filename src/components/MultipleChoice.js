import React, { useState } from "react";
// import useSWR, { mutate } from "swr";
import { submitAnswers } from "../api/answers";
// import { SUBMIT_ANSWERS_PARAM } from "../constant";
import { useQuestion } from "../context/questions";

export default ({ choices, questionId }) => {
  const { answers, setAnswers, mutateAnswerResp } = useQuestion();
  const answer = answers[questionId]?.tag;
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await submitAnswers(questionId, answer);
      mutateAnswerResp(res);
      if (res.data) {
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

    // data.answer.map(({ question, tag }) => {
    //   setAnswers((answers) => {
    //     return {
    //       ...answers,
    //       ...JSON.parse(
    //         `{${JSON.stringify(question)}: ${JSON.stringify(tag)}}`
    //       ),
    //     };
    //   });
    // });
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
          {error && <h4>{error}</h4>}
        </div>
      </form>
    </div>
  );
};
