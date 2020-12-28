import React, { useEffect, useMemo } from "react";
import { useQuestion } from "../context/questions";
import PrevNextButton from "./PrevNextButton";
import MultipleChoice from "./MultipleChoice";
import Error from "./Error";
import AnswerPanel from "./AnswerPanel";
import Countdown from "./Countdown";
import { useAuth } from "../context/auth";
import Logout from "./Logout";

export default ({ match }) => {
  const { isLoggedIn } = useAuth();
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
  return isSessionStarted && questionDetail?.detail && isLoggedIn ? (
    <div className="container">
      <Logout />
      <h1>{questionDetail.detail.title}</h1>
      <div className="row top-container">
        <div className="col-lg-3 col-md-4 col-sm-12 top-left-container">
          <Countdown />
          <AnswerPanel />
        </div>

        <div className="col-lg-9">
          {questionDetail.detail.questionImages?.map((imageUrl) => (
            <img
              key={imageUrl}
              id={imageUrl}
              alt={questionDetail.detail.title}
              src={imageUrl}
            />
          ))}
          <p
            dangerouslySetInnerHTML={{ __html: questionDetail.detail.content }}
          />
          <MultipleChoice
            choices={questionDetail.detail.choices}
            questionId={questionId}
          />
        </div>
      </div>

      <PrevNextButton
        previousQuestionId={questionDetail?.previousQuestionId}
        nextQuestionId={questionDetail?.nextQuestionId}
      />
      <style>
        {`
          .top-container {
            margin: 1em 0;
          }
          .top-left-container {
            padding: 1em;
            background: #ffd1dd;
            border-radius: 1em;
            max-height: 50em;
          }
          @media screen and (max-width: 992px) {
            .top-left-container {
              align-items: center;
              margin-bottom: 2em;
            }
          }
        `}
      </style>
    </div>
  ) : (
    <Error lastQuestionId={lastQuestionId} />
  );
};
