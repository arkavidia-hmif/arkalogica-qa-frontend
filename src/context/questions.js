import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./auth";
import { useFetch } from "../hooks";
import { useHistory } from "react-router-dom";
import { SESSION_PARAM, FE_ARKALOGICA_PARAM } from "../constant";

export const QuestionContext = createContext();

export const useQuestion = () => useContext(QuestionContext);

const textQuestion = {
  id: 232,
  title: "Arkalogica Beautiful",
  description:
    "Commodo quis qui occaecat eiusmod. Nulla adipisicing reprehenderit consequat culpa aute magna fugiat. Ea cupidatat ullamco excepteur duis qui non incididunt exercitation esse ea voluptate nostrud sit. Tempor irure excepteur aliqua proident consectetur nisi ad cupidatat irure ad duis. Officia sint eu non magna irure amet aliquip enim ipsum fugiat. <br/>Nulla ea pariatur irure labore cupidatat aliqua mollit minim pariatur ex amet adipisicing. Voluptate qui consectetur occaecat sint nisi pariatur et et id mollit exercitation incididunt sint ut. Amet quis cupidatat tempor incididunt mollit excepteur dolore. Id in pariatur commodo incididunt veniam in labore excepteur quis magna. Pariatur ullamco culpa nulla deserunt ullamco exercitation velit. Occaecat ex nisi cupidatat laboris nostrud anim eu ad laborum consequat ea irure reprehenderit. Esse fugiat duis mollit quis fugiat ullamco ex culpa in elit elit occaecat.",
  startTime: "2002-10-23T13:16:06z",
  endTime: "2002-10-23T13:16:06z",
  question: [
    {
      id: 1,
      title: "Arkalogica Beautiful",
      content:
        "Velit mollit aliquip culpa nisi duis occaecat duis magna dolor mollit. Exercitation labore in cillum voluptate consectetur voluptate amet. Do ullamco sint excepteur culpa enim exercitation consequat voluptate reprehenderit nisi. <br/>Et cillum fugiat officia enim tempor amet pariatur amet ex est velit occaecat id. Dolor eu fugiat mollit elit qui. Proident ex cillum non velit reprehenderit adipisicing.<p>Consectetur ullamco excepteur ea tempor. In ipsum tempor qui incididunt. Pariatur sunt laboris officia aliqua. Reprehenderit pariatur exercitation adipisicing commodo fugiat officia reprehenderit do deserunt.</p>Id voluptate nulla non consectetur incididunt id sunt. Et magna esse elit ut fugiat. Laboris in velit qui labore esse fugiat. Ea sint sit quis esse incididunt. Consequat est officia tempor tempor officia sunt adipisicing. Laborum irure in quis dolore ex ad do ut.Reprehenderit irure duis cillum eu anim. Et laborum et quis et tempor. Tempor minim quis qui consequat sint occaecat sit mollit ad. Excepteur duis est amet veniam ea aliqua in ad amet veniam ullamco. Cupidatat voluptate mollit esse id. Commodo irure qui fugiat aute pariatur adipisicing enim aute exercitation est.Dolore ex est occaecat in ipsum culpa sunt. Ut excepteur mollit cillum aliqua dolore occaecat cupidatat aliquip id esse ea quis enim. Id aliquip proident enim est ut nisi laboris Lorem. Sunt non ut eiusmod duis aliqua deserunt esse fugiat ea sit. Amet dolor ipsum commodo duis. Irure culpa in incididunt ad veniam et commodo consectetur amet cupidatat. Sit nulla reprehenderit elit consectetur dolor sint aliqua magna aliqua. Sunt proident anim proident nulla eu qui est. Sint ex sint dolore mollit tempor ad occaecat laborum sint nisi tempor cupidatat laboris. Irure deserunt reprehenderit voluptate ut commodo consectetur incididunt ullamco. Qui fugiat culpa qui cupidatat est veniam aliquip esse voluptate Lorem pariatur consequat velit quis. Amet aute aute ullamco ut nisi deserunt non. Commodo amet velit cupidatat nisi adipisicing in cupidatat aliquip eu fugiat ex velit non excepteur.",
      images: [
        {
          url: "https://aiscevent.com/static/media/logo.d93fb82e.png",
        },
        {
          url:
            "https://firebasestorage.googleapis.com/v0/b/aiche-conference.appspot.com/o/admin%2Fhome%2Fwebinar_f.jpg?alt=media&token=7c9774ac-bf01-4419-a508-fc2a3a81b211",
        },
      ],
      choices: [
        {
          tag: "a",
          content: "Velit proident excepteur aliquip minim amet.",
          images: [],
        },
        {
          tag: "b",
          content: "Velit proident excepteur aliquip minim amet.",
          images: [
            {
              url:
                "https://firebasestorage.googleapis.com/v0/b/aiche-conference.appspot.com/o/admin%2Fhome%2Fwebinar_f.jpg?alt=media&token=7c9774ac-bf01-4419-a508-fc2a3a81b211",
            },
          ],
        },
        {
          tag: "c",
          content: "Velit proident excepteur aliquip minim amet.",
          images: [],
        },
      ],
    },
  ],
};

const QuestionContextProvider = ({ children }) => {
  const history = useHistory();
  const { authTokens } = useAuth();

  const [session, setSession] = useState({});
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [startFetch, setStartFetch] = useState(false);
  const sessionResponse = useFetch(startFetch, SESSION_PARAM);

  useEffect(() => console.log(isSessionStarted), [isSessionStarted]);
  useEffect(() => {
    if (sessionResponse.error) {
      // console.log(sessionResponse.error);
      setSession(textQuestion);
      setStartFetch(false);
      return;
    }
    if (sessionResponse.data?.question) {
      setSession(sessionResponse.data);
      setIsSessionStarted(true);
      setStartFetch(false);
    }
  }, [sessionResponse, setSession]);

  useEffect(() => {
    authTokens &&
      session?.title &&
      session?.question &&
      history.push(FE_ARKALOGICA_PARAM);
  }, [authTokens, history, session]);

  return (
    <QuestionContext.Provider
      value={{ session, startFetch, setStartFetch, isSessionStarted }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
