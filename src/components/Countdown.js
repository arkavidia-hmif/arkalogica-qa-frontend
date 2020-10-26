import React, { useEffect, useRef, useState } from "react";
import { isAfterTime, isBeforeTime, isBetweenTime } from "../utils";

const Countdown = () => {
  const arkalogicaStartDate = new Date(2020, 9, 26, 18, 46).getTime();
  const arkalogicaEndDate = new Date(2020, 9, 26, 18, 48).getTime();
  const timeSpanArkalogica = arkalogicaEndDate - arkalogicaStartDate;

  const [timerDays, setTimerDays] = useState("0");
  const [timerHours, setTimerHours] = useState("0");
  const [timerMinutes, setTimerMinutes] = useState("0");
  const [timerSeconds, setTimerSeconds] = useState("0");
  const [before, setBefore] = useState(isBeforeTime(arkalogicaStartDate));
  const [between, setBetween] = useState(
    isBetweenTime(arkalogicaStartDate, arkalogicaEndDate)
  );
  const [after, setAfter] = useState(isAfterTime(arkalogicaEndDate));

  //   const { value: timesUp, setTrue: setIsTimesUp } = useBoolean(false);
  //   const { value: arkalogica, setTrue: SetIsArkalogica } = useBoolean(false);

  let interval = useRef();

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const trueDistance = arkalogicaEndDate - now;
      const distance = trueDistance - (before ? timeSpanArkalogica : 0);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (trueDistance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

      setBefore(isBeforeTime(arkalogicaStartDate));
      setBetween(isBetweenTime(arkalogicaStartDate, arkalogicaEndDate));
      setAfter(isAfterTime(arkalogicaEndDate));
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
        {timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}
      </h3>
      {before && <p>Until arkalogica</p>}
      {between && <p>Tme Remaining</p>}
      {after && <p>Time's up</p>}
    </div>
  );
};

export default Countdown;
