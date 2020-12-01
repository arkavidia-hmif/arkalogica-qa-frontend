import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useFetch, useLocalStorage } from "../hooks";
import { SESSION_PARAM, SUBMISSIONS_PARAM, textQuestion } from "../constant";
import { isValidTime } from "../utils";
import useSWR from "swr";
import { getAllAnswers } from "../api/answers";

export const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

const QuestionContextProvider = ({ children }) => {
  const [lastQuestionId, setLastQuestionId] = useLocalStorage(
    "lastQuestionId",
    ""
  );
  const [session, setSession] = useState(textQuestion);

  const {
    data: answerResp,
    error: errorAnswerResp,
    mutate: mutateAnswerResp,
  } = useSWR(SUBMISSIONS_PARAM, getAllAnswers);

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (answerResp) {
      answerResp.answer.map(({ questionId, tag }) =>
        setAnswers((answers) => {
          return {
            ...answers,
            ...JSON.parse(
              `{${JSON.stringify(questionId)}: {
                ${JSON.stringify("tag")}: ${JSON.stringify(tag)},
                ${JSON.stringify("submitted")}: ${true} 
              }
              }`
            ),
          };
        })
      );
    }
  }, [answerResp]);

  const isSessionStarted = isValidTime(
    Date.parse(session?.startTime),
    Date.parse(session?.endTime)
  );
  const sessionResponse = useFetch(SESSION_PARAM);

  useEffect(() => console.log(isSessionStarted), [isSessionStarted]);

  useEffect(() => {
    if (sessionResponse.error) return;
    // {
    //   // console.log(sessionResponse.error);
    //   // setSession(textQuestion);
    //   return;
    // }
    if (sessionResponse.data?.question) {
      setSession(sessionResponse.data);
    }
  }, [
    session.question,
    sessionResponse.data,
    sessionResponse.error,
    setSession,
  ]);

  const getQuestionDetail = useCallback(
    (questionId) => {
      if (session?.question) {
        const questions = session.question;
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
