import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useFetch, useLocalStorage } from "../hooks";
import { SESSION_PARAM, textQuestion } from "../constant";
import { isValidTime } from "../utils";

export const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

const QuestionContextProvider = ({ children }) => {
  const [lastQuestionId, setLastQuestionId] = useLocalStorage(
    "lastQuestionId",
    ""
  );
  const [session, setSession] = useState(textQuestion);
  const [answers, setAnswers] = useState({});

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
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
