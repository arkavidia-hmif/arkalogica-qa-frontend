import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuestion } from "../context/questions";
import {
  isBeforeTime,
  isValidTime,
  toDays,
  toHours,
  toMinutes,
  toSeconds,
} from "../utils";

const Countdown = () => {
  const { session, setIsTimesUp } = useQuestion();

  const arkalogicaStartDate = Date.parse(session.startTime);
  const arkalogicaEndDate = Date.parse(session.endTime);

  const status = (startTime, endTime) => {
    if (isBeforeTime(startTime)) {
      return 0;
    } else if (isValidTime(startTime, endTime)) {
      return 1;
    } else {
      return 2;
    }
  };

  const statusText = (status) => {
    if (status === 0) {
      return "Until arkalogica";
    } else if (status === 1) {
      return "Time remaining";
    } else {
      return "Time's up";
    }
  };

  const [competitionStatus, setCompetitionStatus] = useState(
    status(arkalogicaStartDate, arkalogicaEndDate)
  );

  const [timer, setTimer] = useState(0);

  let interval = useRef();

  const startTimer = () => {
    interval = setInterval(() => {
      setCompetitionStatus(status(arkalogicaStartDate, arkalogicaEndDate));
      const end =
        competitionStatus === 0 ? arkalogicaStartDate : arkalogicaEndDate;
      const now = new Date().getTime();
      let distance = end - now <= 0 ? 0 : end - now;

      if (distance <= 0 && competitionStatus === 2) {
        clearInterval(interval.current);
        setIsTimesUp(true);
      } else {
        setTimer(distance);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    const intervalCurrent = interval.current;
    return () => {
      clearInterval(intervalCurrent);
    };
  });

  return (
    <div id="main-countdown">
      <h3>Countdown</h3>
      <div className="countdown-container">
        <div className="countdown-content">
          {competitionStatus !== 2 && (
            <h4>
              {toDays(timer)} : {toHours(timer)} : {toMinutes(timer)} :
              {toSeconds(timer)}
            </h4>
          )}
          <h4>{statusText(competitionStatus)}</h4>
          {competitionStatus === 2 && (
            <div>
              You can still navigate the answer panel to check your answer.{" "}
              <strong>Don't refresh the page!</strong>
              <h4 className="font-weight-bold">OR</h4>
              <div>
                <Link to="/done" className="btn arkav-btn">
                  Go to main page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          #main-countdown {
            text-align: center;
          }

          .countdown-container {
            background: #fca7be;
            padding: 1em 0.8em;
            border-radius: 1em;
          }
          .countdown-content {
            background: #fca7be;
            color: black;
            padding: 0.5em;
            border-radius: 0.5em;
          }
        `}
      </style>
    </div>
  );
};

export default Countdown;
