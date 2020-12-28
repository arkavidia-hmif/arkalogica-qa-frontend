import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useFetch, useLocalStorage } from "../hooks";

import { SESSION_PARAM, SUBMISSIONS_PARAM } from "../constant";
import { isValidTime } from "../utils";
import { useAuth } from "./auth";
import useSWR from "swr";
import { getAllAnswers } from "../api/answers";

export const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

const QuestionContextProvider = ({ children }) => {
  const { authTokens, isLoggedIn } = useAuth();
  const [lastQuestionId, setLastQuestionId] = useLocalStorage(
    "lastQuestionId",
    ""
  );
  const [session, setSession] = useState({});

  const {
    data: answerResp,
    error: errorAnswerResp,
    mutate: mutateAnswerResp,
  } = useSWR(isLoggedIn ? SUBMISSIONS_PARAM : null, () =>
    getAllAnswers(authTokens)
  );

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (answerResp?.answers) {
      answerResp.answers.map((answer) => {
        setAnswers((answers) => {
          return {
            ...answers,
            ...JSON.parse(
              `{${JSON.stringify(answer.question)}: {
                ${JSON.stringify("tag")}: ${JSON.stringify(answer.tag)},
                ${JSON.stringify("submitted")}: ${true}
              }
              }`
            ),
          };
        });
      });
    }
  }, [isLoggedIn, answerResp, errorAnswerResp]);

  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const sessionResponse = useFetch(SESSION_PARAM);

  useEffect(() => {
    if (sessionResponse.error) return;

    if (sessionResponse.data?.questions) {
      setIsSessionStarted(
        isValidTime(
          Date.parse(session?.startTime),
          Date.parse(session?.endTime)
        )
      );

      setSession(sessionResponse.data);
    }
  }, [
    isLoggedIn,
    session.question,
    session.endTime,
    session.startTime,
    sessionResponse.data,
    sessionResponse.error,
    setSession,
  ]);

  const getQuestionDetail = useCallback(
    (questionId) => {
      if (session?.questions) {
        const questions = session.questions;
        let data = {};
        for (let i = 0; i < questions.length; i++) {
          if (String(questions[i].id) === String(questionId)) {
            data.detail = questions[i];
            if (i !== 0) data.previousQuestionId = questions[i - 1].id;
            if (i !== questions.length - 1)
              data.nextQuestionId = questions[i + 1].id;
          }
        }
        return data;
      }
    },
    [session]
  );

  return (
    <QuestionContext.Provider
      value={{
        session,
        isSessionStarted,
        lastQuestionId,
        setLastQuestionId,
        getQuestionDetail,
        answers,
        setAnswers,
        answerResp,
        errorAnswerResp,
        mutateAnswerResp,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
