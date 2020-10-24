import React from "react";
import { useQuestion } from "../context/questions";
import PrevNextButton from "./PrevNextButton";

export default ({ match }) => {
  const number = parseInt(match?.params?.questionNumber);
  const { session } = useQuestion();
  const totalQuestion = session?.question?.length;
  const time = String(new Date(session?.endTime));

  return (
    <div className="container">
      <h1>{session?.title}</h1>
      <p className="font-weight-bold">End time: {time}</p>
      <p>{session?.description}</p>
      <div className="justify-content-space-between">
        <PrevNextButton number={number} totalQuestion={totalQuestion} />
      </div>
    </div>
  );
};
