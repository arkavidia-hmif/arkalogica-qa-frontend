import React, { useEffect, useRef, useState } from "react";
import { useCompetitionStatus } from "../hooks";
import {
  isAfterTime,
  isBeforeTime,
  isBetweenTime,
  toDays,
  toHours,
  toMinutes,
  toSeconds,
} from "../utils";

const arkalogicaStartDate = new Date(2020, 9, 31, 16, 17).getTime();
const arkalogicaEndDate = new Date(2020, 9, 31, 16, 17, 10).getTime();

const Countdown = () => {
  const status = (startTime, endTime) => {
    if (isBeforeTime(startTime)) {
      return 0;
    } else if (isBetweenTime(startTime, endTime)) {
      return 1;
    } else {
      return 2;
    }
  };

  const statusText = (status) => {
    if (status == 0) {
      return <h3>Until arkalogica</h3>;
    } else if (status == 1) {
      return <h3>Time remaining</h3>;
    } else {
      return <h3>Time's up</h3>;
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
        competitionStatus == 0 ? arkalogicaStartDate : arkalogicaEndDate;
      const now = new Date().getTime();
      let distance = end - now;

      if (distance < 0 && competitionStatus == 2) {
        clearInterval(interval.current);
      } else {
        setTimer(distance);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div>
      <h1>Countdown</h1>
      <h3>
        {toDays(timer)} : {toHours(timer)} : {toMinutes(timer)} :
        {toSeconds(timer)}
      </h3>
      <p>status = {competitionStatus}</p>
      {statusText(competitionStatus)}
    </div>
  );
};

export default Countdown;
