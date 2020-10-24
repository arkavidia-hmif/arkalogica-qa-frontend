import React, { useEffect, useMemo } from "react";
import { useQuestion } from "../context/questions";
import PrevNextButton from "./PrevNextButton";
import MultipleChoice from "./MultipleChoice";
import Error from "./Error";

export default ({ match }) => {
  const questionId = match?.params?.questionId;
  const {
    lastQuestionId,
    setLastQuestionId,
    getQuestionDetail,
    isSessionStarted,
  } = useQuestion();
  // const answer = answers?.filter((ans) => ans.question === questionId);

  // const questionDetail = getQuestionDetail(questionId);

  const questionDetail = useMemo(() => getQuestionDetail(questionId), [
    getQuestionDetail,
    questionId,
  ]);

  // console.log(questionDetail);
  useEffect(() => setLastQuestionId(questionId), [
    questionId,
    setLastQuestionId,
  ]);
  // const answer = useMultipleChoice(questionDetail?.detail?.choices);

  // const time = String(new Date(session?.endTime));

  return isSessionStarted && questionDetail?.detail ? (
    <div className="container">
      <h1>{questionDetail.detail.title}</h1>
      {questionDetail.detail.images?.map((image) => (
        <img
          key={image.url}
          id={image.url}
          alt={questionDetail.detail.title}
          src={image.url}
        />
      ))}
      <p dangerouslySetInnerHTML={{ __html: questionDetail.detail.content }} />
      <MultipleChoice
        choices={questionDetail.detail.choices}
        questionId={questionId}
      />
      <PrevNextButton
        previousQuestionId={questionDetail?.previousQuestionId}
        nextQuestionId={questionDetail?.nextQuestionId}
      />
    </div>
  ) : (
    <Error lastQuestionId={lastQuestionId} />
  );
};
