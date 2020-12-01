import React from "react";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import AnswerPanel from "./AnswerPanel";

export default () => {
  const { isSessionStarted, session } = useQuestion();

  const time = String(new Date(session?.endTime));
  return isSessionStarted ? (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12 top-left-container">
          <Countdown />
          <AnswerPanel />
        </div>
        <div className="col-lg-9">
          <h1>{session?.title}</h1>
          <p className="font-weight-bold">End time: {time}</p>
          <p>{session?.description}</p>
          <Link
            to={FE_ARKALOGICA_PARAM + "/" + String(session?.question[0]?.id)}
            className="btn btn-primary"
          >
            Challenge
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .top-left-container {
            padding: 1em;
            background: #5cdb95;
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
    <>
      <h1>Arkalogica Preliminary</h1>
      Waiting
    </>
  );
};
