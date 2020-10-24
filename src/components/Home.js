import React from "react";
import { useQuestion } from "../context/questions";

export default () => {
  const { setStartFetch } = useQuestion();
  const handleStart = () => setStartFetch(true);

  return (
    <div>
      Arkalogica Preliminary
      <button onClick={handleStart} className="btn btn-primary">
        Start now
      </button>
    </div>
  );
};
