import React from "react";
import { useQuestion } from "../context/questions";

export default () => {
  const { session } = useQuestion();
  //   const timer = session?.endTime;
  return (
    <div className="container">
      <h1>{session?.title}</h1>
      <h3 style={{ fontWeight: "bold" }}>End time: {session?.endTime}</h3>
      <p>{session?.description}</p>
      <button className="btn btn-primary"></button>
    </div>
  );
};
