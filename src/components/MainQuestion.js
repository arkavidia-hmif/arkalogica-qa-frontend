import React from "react";
import { FE_ARKALOGICA_PARAM } from "../constant";
import { useQuestion } from "../context/questions";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import AnswerPanel from "./AnswerPanel";
import { useAuth } from "../context/auth";
import Logout from "./Logout";

export default () => {
  const { isSessionStarted, session } = useQuestion();
  const { isLoggedIn } = useAuth();

  const time = String(new Date(session?.endTime));
  return (
    <div>
      {isSessionStarted && isLoggedIn ? (
        <div className="container">
          <div className="row">
            <Logout />
          </div>
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
                to={FE_ARKALOGICA_PARAM + String(session?.questions[0]?.id)}
                className="btn arkav-btn"
              >
                Challenge
              </Link>
            </div>
          </div>
          <style>
            {`
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
        <div className="container">
          <div className="row">
            <Logout />
          </div>
          <h1 className="mainquestion-title">Arkalogica Preliminary</h1>
          <h3 className="mainquestion-title">Waiting ...</h3>
          <style>
            {`
                .mainquestion-title {
                  text-align: center;
                }
              `}
          </style>
        </div>
      )}
    </div>
  );
};
